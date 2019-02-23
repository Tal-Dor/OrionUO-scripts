/*

////////////////////////////////////////////////////////////////////////////////
//                            ~ Summon Creature ~                             //
//                             - Taldor / Quin -                              //
////////////////////////////////////////////////////////////////////////////////

Vykouzleni summonu pres WaitMenu vcetne pouziti Renamer();

Pouziti:
Hotkey -> Run script :
Summon_Oclock
Summon_DVortex
Scorpion
etc..

*/
function Summon_Oclock() {
  Orion.CancelWaitMenu();
  Orion.WaitMenu('What do you want to summon', 'Dark Oclock');
  Orion.Cast('Summ. Creature', 'self');
  Orion.Wait(4000);
}

function Summon_DVortex() {
  Orion.CancelWaitMenu();
  Orion.WaitMenu('What do you want to summon', 'Death Vortex');
  Orion.Cast('Summ. Creature', 'self');
  Orion.Wait(4000);
  Renamer();
  PetCommander('Stop');
}

function Scorpion() {
  Orion.CancelWaitMenu();
  Orion.WaitMenu('What do you want to summon', 'Scorpion');
  Orion.Cast('Summ. Creature', 'lasttarget');
  Orion.Wait(3500);
}
