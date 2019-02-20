/*

////////////////////////////////////////////////////////////////////////////////
//                             ~ Self Watcher ~                               //
//                             - Taldor / Quin -                              //
////////////////////////////////////////////////////////////////////////////////

Script co hlida kdyz dostanete paru / poison, hodi automaticky sipku pri pare.
da se rozsirit o hlidani svetla, low HP, jidla, atd...casem doplnim

Pouziti:
Hotkey -> Run script :
BigBrother

- script bezi na pozadi celou dobu nez umrete to jde zmenit v podmince -> while (!Player.Dead())

*/

function BigBrother() {
    var Msg = "You are frozen and can not move";
    Orion.ClearJournal(Msg);
    while (!Player.Dead())
    {
        if (Orion.InJournal(Msg, 'sys|my'))
        {
            Orion.ClearJournal(Msg);
            Orion.CharPrint('self', 0x0026, '**PARALYZED**');
		    Orion.Cast('Magic Arrow', self);
            Orion.Wait(2500);
            Orion.ClearJournal(Msg);
        }
        if (Player.Poisoned())
        {
          Orion.CharPrint('self', 0x0026, '**POISONED**');
          Orion.Wait(2500);
        }
        else
        {
            Orion.Wait(100);
        }
    }
}
