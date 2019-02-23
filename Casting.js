/*

////////////////////////////////////////////////////////////////////////////////
//                                ~ Casting ~                                 //
//                             - Taldor / Quin -                              //
////////////////////////////////////////////////////////////////////////////////

Ukazka casteni ze scrollu na lasttarget a self, pokud nejsou svitky casti z hlavy

Pouziti:
Hotkey -> Run script :
KVF_scroll()
self_gh()

~~~~~~~~~~~~~~~ID scrollu~~~~~~~~~~~~~~~
----------------HARMFUL----------------
var Paralyze_scroll = '0x1F52';
var FlameStrike_scroll = '0x1F5F';
var EnergyBolt_scroll = '0x1F56';
var Harm_scroll = '0x1F38';
var ParalyzeField_scroll = '0x1F5B';
----------------NEUTRAL----------------
var NightSight_scroll = '0x1F33';
var BladeSpirits_scroll = '0x1F4D';
var WallOfStone_scroll = '0x1F44';
var Teleport_scroll = '0x1F42';
var Recall_scroll = '0x1F4C';
----------------BENEFIT----------------
var Dispel_scroll = '0x1F55';
var ReactiveArmor_scroll = '0x1F2D';
var Ressurection_scroll = '0x1F67';
var MagicReflection_scroll = '0x1F50';
var GreaterHeal_scroll = '0x1F49';

*/
function KVF_scroll() {
  var FlameStrike_scroll = '0x1F5F';
  if (Orion.Count(FlameStrike_scroll) < 1) {
    Orion.Print("Flame Strike Scroll = 0");
  }
  if (Player.Mana() < 10) {
    Orion.Print("Not enough mana!");
    return;
  }
  Orion.WaitTargetObject(lasttarget);
  if (Orion.Count(FlameStrike_scroll) != 0) {
    Orion.UseType(FlameStrike_scroll);
  } else {
    Orion.Print("Scrolls not found, cast from Book");
    Orion.Cast('Flame Strike');
  }
}

function self_gh() {
  var GreaterHeal_scroll = '0x1F49';
  if (Orion.Count(GreaterHeal_scroll) < 1) {
    Orion.Print("GH Scroll = 0");
  }
  if (Player.Mana() < 10) {
    Orion.Print("Not enough mana!");
    return;
  }
  Orion.WaitTargetObject(self);
  if (Orion.Count(GreaterHeal_scroll) != 0)
    Orion.UseType(GreaterHeal_scroll);
  else {
    Orion.Print("Scrolls Not Found, cast from Book");
    Orion.Cast('Greater Heal');
  }
}
