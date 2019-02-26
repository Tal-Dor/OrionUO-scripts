////////////////////////////////////////////////////////////////////////////////
//                         ~ Spider Webs Destroyer ~                          //
//                             - Taldor / Quin -                              //
////////////////////////////////////////////////////////////////////////////////
//
// SpiderWebsDestroyer:
// Vyhleda a znici postupne vsechny pavuciny v dosahu (1 policko) kolem charakteru
//
// SpiderWebsDestroyer_Toggle:
// to stejne ale s moznosti ON / OFF switche, tzn. neustaly beh na pozadi
//
// Pouziti:
// Hotkey -> Run script :
// SpiderWebsDestroyer()
// SpiderWebsDestroyer_Toggle()    <- !!! NEZASKRTAVAT "Run one script" !!!
//
////////////////////////////////////////////////////////////////////////////////

function SpiderWebsDestroyer() {
  var webs = FindSpiderWebs(null);
  if (webs == null) {
    Orion.ResetIgnoreList();
    Orion.IgnoreReset();
    Orion.Print('-1', 'Zadny pavuciny v okoli nejsou!');
  }
  while (webs) {
    Orion.AddObject('SpiderWeb', webs.Serial());
    Orion.CharPrint(webs.Serial(), '-1', '>>> NICIM <<<');
    Orion.Wait(250);
    Orion.UseObject('SpiderWeb');
    Orion.Wait(250);
    webs = FindSpiderWebs(null);
  }
}

function SpiderWebsDestroyer_Watcher(_private) {
  Orion.CharPrint('self', '0x44', '- SWD Watcher ON -');
  Orion.SetGlobal('SWD_loop', 1);
  while (!Player.Dead()) {
    var webs = FindSpiderWebs(null);
    if (webs == null) {
      Orion.ResetIgnoreList();
      Orion.IgnoreReset();
      //Orion.Print('-1', 'Zadny pavuciny v okoli nejsou!');
    }
    while (webs) {
      Orion.AddObject('SpiderWeb', webs.Serial());
      Orion.CharPrint(webs.Serial(), '-1', '>>> NICIM <<<');
      Orion.Wait(250);
      Orion.UseObject('SpiderWeb');
      Orion.Wait(250);
      webs = FindSpiderWebs(null);
    }
    Orion.Wait(1000);
  }
}

function SpiderWebsDestroyer_Toggle() {
  if (Orion.GetGlobal('SWD_loop') == 1) {
    //Orion.Print('Target not dead yet,restarting loop');
    Orion.Terminate('SpiderWebsDestroyer_Watcher');
    Orion.CharPrint('self', '0x22', '- SWD Watcher OFF -');
    Orion.SetGlobal('SWD_loop', 0);
  } else {
    Orion.Exec('SpiderWebsDestroyer_Watcher');
  }
}

function FindSpiderWebs(dummy) {
  var spiderWebs = Orion.FindType('0x0EE1|0x0EE2|0x0EE3|0x0EE4|0x0EE5|0x0EE6|0x0EE7|0x0EE8', '-1', ground, 'fast', '1');
  if (spiderWebs.length) {
    return Orion.FindObject(spiderWebs[0]);
  }
  return null;
}
