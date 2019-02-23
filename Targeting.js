/*

////////////////////////////////////////////////////////////////////////////////
//                               ~ Targeting ~                                //
//                             - Taldor / Quin -                              //
////////////////////////////////////////////////////////////////////////////////

PvP a PvM targetovaci script
-Script se po 800ms resetuje, cas se da nastavit: var resetTime = 800;
-PvM script targetuje vsechny NON-HUMAN gray/red enemy, ignoruje vsechny vase summony a pety
-PvP script targetuje vsechny humany (na DP bude nejspis nutno pozmenit kvuli vampum a nebo na jejich targetovani pouzivat PvM verzi to stejny plati o morfech)
-AttackLastTarget nastavi client a system target na lasttarget a vypise nad jeho hlavou >>> Attack: Jmeno <<<

Pouziti:
Hotkey -> Run script :
TargetNextEnemy_PvM()
TargetNextEnemy_PvP()
AttackLastTarget()

*/
function FindNearestEnemy_PvM(a) //subfunction
{
  //timer rest idea from Caleb
  var resetTime = 800;
  var currentTimeMs = Orion.Now();
  var lastTimeMs = Orion.GetGlobal("FindNearestEnemy_PvM_LastTime");

  var timeSpan = currentTimeMs - lastTimeMs;

  if (timeSpan > resetTime) {
    //Orion.Print('-1', 'TIMER RESET: ' + timeSpan); //debug
    Orion.IgnoreReset();
  }
  Orion.Ignore('self');
  //Orion.UseIgnoreList('ignoreProvoke'); //example usage of custom IgnoreList
  var enemy = Orion.FindType("!0x0190|!0x0191", "-1", "ground", "near|mobile|ignorefriends", 18, "gray|red");
  if (!enemy.length) {
    Orion.Print('-1', 'no enemy found, resetting ignore list');
    Orion.IgnoreReset();
    return '';
  }
  var eSummon = (Orion.FindObject(enemy[0])).CanChangeName();
  while (eSummon) {
    //Orion.Print('[Summon:] ' + (Orion.FindObject(enemy[0])).Name()); //debug print
    Orion.Ignore(enemy[0]);
    enemy = Orion.FindType("!0x0190|!0x0191", "-1", "ground", "near|mobile|ignorefriends", 18, "gray|red");
    if (!enemy.length) {
      Orion.Print('-1', 'no enemy found, resetting ignore list');
      Orion.IgnoreReset();
      return '';
    }
    eSummon = (Orion.FindObject(enemy[0])).CanChangeName();
  }
  Orion.SetGlobal("FindNearestEnemy_PvM_LastTime", Orion.Now());
  return enemy[0];
}

function TargetNextEnemy_PvM() {
  if (Orion.HaveTarget()) {
    //Orion.TargetObject(lasttarget);
    Orion.TargetObject(Orion.GetGlobal('global_enemy'));
  } else {
    var serial = FindNearestEnemy_PvM(0);
    if (!serial.length) return;
    var enemy = Orion.FindObject(serial);
    var notoColor;
    switch (enemy.Notoriety()) {
      case 1:
        notoColor = 2119;
        break;
      case 3:
        notoColor = 906;
        break;
      case 6:
        notoColor = 33;
        break;
      default:
        notoColor = 906;
    }
    var loop = 0;
    while (loop < 5) {
      Orion.CharPrint(self, notoColor, ' ');
      Orion.CharPrint(lasttarget, notoColor, ' ');
      loop++;
    }
    Orion.CharPrint(self, notoColor, '[Enemy:] ' + enemy.Name() + ' ' + enemy.Hits('%') + '%');
    Orion.CharPrint(serial, notoColor, '>>> ' + enemy.Name() + ' <<<');
    Orion.SetGlobal('global_enemy', serial);
    Orion.ClientLastTarget(serial);
    Orion.TargetSystemSerial(serial);
    Orion.Ignore(serial);
  }
}


function FindNearestEnemy_PvP(a) //subfunction
{
  //timer rest idea from Caleb
  var resetTime = 800;
  var currentTimeMs = Orion.Now();
  var lastTimeMs = Orion.GetGlobal("FindNearestEnemy_PvP_LastTime");

  var timeSpan = currentTimeMs - lastTimeMs;

  if (timeSpan > resetTime) {
    //Orion.Print('-1', 'TIMER RESET'); //debug
    Orion.IgnoreReset();
  }
  Orion.Ignore('self');
  var enemy = Orion.FindType("-1", "-1", "ground", "human|near|mobile|ignorefriends", 18, "gray|criminal|orange|red");
  if (!enemy.length) {
    Orion.Print('-1', 'no enemy found, resetting ignore list');
    Orion.IgnoreReset();
    return '';
  }
  Orion.SetGlobal("FindNearestEnemy_PvP_LastTime", Orion.Now());
  return enemy[0];
}

function TargetNextEnemy_PvP() {
  if (Orion.HaveTarget()) {
    //Orion.TargetObject(lasttarget);
    Orion.TargetObject(Orion.GetGlobal('global_enemy'));
  } else {
    var serial = FindNearestEnemy_PvP();
    if (!serial.length) return;
    var enemy = Orion.FindObject(serial);
    var notoColor;
    switch (enemy.Notoriety()) {
      case 1:
        notoColor = 2119;
        break;
      case 3:
        notoColor = 906;
        break;
      case 6:
        notoColor = 33;
        break;
      default:
        notoColor = 906;
    }
    var loop = 0;
    while (loop < 5) {
      Orion.CharPrint(self, notoColor, ' ');
      Orion.CharPrint(lasttarget, notoColor, ' ');
      loop++;
    }
    Orion.CharPrint(self, notoColor, '[Enemy:] ' + enemy.Name() + ' ' + enemy.Hits('%') + '% HP');
    Orion.CharPrint(serial, notoColor, '*** Target: ' + enemy.Name() + ' ***');
    Orion.SetGlobal('global_enemy', serial);
    Orion.ClientLastTarget(serial);
    Orion.TargetSystemSerial(serial);
    Orion.Ignore(serial);
  }
}

function AttackLastTarget() {
  Orion.ClientLastTarget('lasttarget');
  Orion.TargetSystemSerial('lasttarget');
  Orion.CharPrint('lasttarget', 0x17, '>>> Attack: ' + Orion.RequestName(lasttarget, 500) + ' <<<');
}
