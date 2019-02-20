/*

////////////////////////////////////////////////////////////////////////////////
//                               ~ Targeting ~                                //
//                             - Taldor / Quin -                              //
////////////////////////////////////////////////////////////////////////////////

PvP a PvM targetovaci script
-PvM script targetuje vsechny NON-HUMAN gray/red enemy, ignoruje vsechny vase summony a pety
-PvP script targetuje vsechny humany (na DP bude nejspis nutno pozmenit kvuli vampum a nebo na jejich targetovani pouzivat PvM verzi to stejny plati o morfech)
-AttackLastTarget nastavi client a system target na lasttarget a vypise nad jeho hlavou >>> Attack: Jmeno <<<

Pouziti:
Hotkey -> Run script :
TargetNextEnemy_PVM()
TargetNextEnemy_PVP()
AttackLastTarget()

*/

function FindNearestEnemy_PVM(a) //subfunction
{
	Orion.Ignore('self');
	//Orion.UseIgnoreList('ignoreProvoke'); // na provoke barda z jinyho shardu, neni potreba
	var enemy = Orion.FindType("!0x0190|!0x0191", "-1", "ground", "near|mobile", 18, "gray|red");
	if (!enemy.length)
	{
            Orion.Print( '-1', 'no enemy found, resetting ignore list');
            Orion.IgnoreReset();
            return '';
      }
	var eSummon = (Orion.FindObject(enemy[0])).CanChangeName();
      while (eSummon)
      {
      	//Orion.Print('[Summon:] ' + (Orion.FindObject(enemy[0])).Name()); //debug print
		Orion.Ignore(enemy[0]);
		enemy = Orion.FindType("!0x0190|!0x0191", "-1", "ground", "near|mobile", 18, "gray|red");
		if (!enemy.length)
		{
            	Orion.Print( '-1', 'no enemy found, resetting ignore list');
            	Orion.IgnoreReset();
            	return '';
      	}
      	eSummon = (Orion.FindObject(enemy[0])).CanChangeName();
      }
    return enemy[0];
}

function TargetNextEnemy_PVM() {
    if (Orion.HaveTarget()) {
        Orion.TargetObject(Orion.GetGlobal('global_enemy'));
    }
    else {
        var serial = FindNearestEnemy_PVM(0);
        if(!serial.length) return;
        var enemy = Orion.FindObject(serial);
        var notoColor;
        switch  (enemy.Notoriety()) {
            case 1: notoColor = 2119;
                    break;
            case 3: notoColor = 906;
                    break;
            case 6: notoColor = 33;
                    break;
            default: notoColor = 906;
        }
 	var loop = 0;
      while (loop < 5){
              Orion.CharPrint(self, notoColor, ' ');
              Orion.CharPrint(lasttarget,notoColor, ' ');
              loop++;
      }
        Orion.CharPrint(self, notoColor, '[Enemy:] ' + enemy.Name() + ' ' + enemy.Hits('%') + '%');
        Orion.CharPrint(serial,notoColor, '>>> ' + enemy.Name() + ' <<<');
        Orion.SetGlobal('global_enemy',serial);
        Orion.ClientLastTarget(serial);
        Orion.TargetSystemSerial(serial);
        Orion.Ignore(serial);
    }
}

function FindNearestEnemy_PVP(a) //subfunction
{
	Orion.Ignore('self');
	var enemy = Orion.FindType("-1", "-1", "ground", "human|near|mobile|ignorefriends", 18, "gray|criminal|orange|red");
	if ( !enemy.length )  	{
//    Orion.Ignore('self');
//    var friends = Orion.GetFriendList();
//    for(var i = 0; i < friends.length; i++) {
//        Orion.Ignore(friends[i]);
//    }
//    var enemy = Orion.FindType('0xFFFFFF', '-1', ground, 'near|mobile', '18', 'gray|criminal|red|orange|blue');
//    if ( !enemy.length )      {
            Orion.Print( '-1', 'no enemy found, resetting ignore list');
            Orion.IgnoreReset();
            return '';
    }
    return enemy[0];
}

function TargetNextEnemy_PVP() {
    if (Orion.HaveTarget() ) {
         //Orion.TargetObject(lasttarget);
        Orion.TargetObject(Orion.GetGlobal('global_enemy'));
    }
    else
    {
        var serial = FindNearestEnemy_PVP();
        if(!serial.length) return;
        var enemy = Orion.FindObject(serial);
        var notoColor;
        switch  (enemy.Notoriety() ) {
            case 1: notoColor = 2119;
                    break;
            case 3: notoColor = 906;
                    break;
            case 6: notoColor = 33;
                    break;
            default: notoColor = 906;
        }
 	var loop = 0;
      while ( loop < 5 ){
              Orion.CharPrint(self, notoColor, ' ');
              Orion.CharPrint(lasttarget,notoColor, ' ');
              loop++;
      }
        Orion.CharPrint(self, notoColor, '[Enemy:] ' + enemy.Name() + ' ' + enemy.Hits('%') + '% HP');
        Orion.CharPrint(serial,notoColor, '*** Target: ' + enemy.Name() + ' ***');
        Orion.SetGlobal('global_enemy',serial);
        Orion.ClientLastTarget(serial);
        Orion.TargetSystemSerial(serial);
        Orion.Ignore(serial);
    }
}



function AttackLastTarget()
{
	Orion.ClientLastTarget('lasttarget');
	Orion.TargetSystemSerial('lasttarget');
	Orion.CharPrint('lasttarget', 0x17, '>>> Attack: ' +  Orion.RequestName(lasttarget, 500) + ' <<<');
}
