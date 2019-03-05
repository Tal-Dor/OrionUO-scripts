////////////////////////////////////////////////////////////////////////////////
//                             ~ Potion Manager ~                             //
//                             - Taldor / Quin -                              //
////////////////////////////////////////////////////////////////////////////////
//
// Univerzalni script na pouzivani vsech druhu potionu.Sam si i nacepuje a vypije
// pokud mas u sebe kad.
//
// Pouziti:
// Hotkey -> External code :
// Potion_Manager('tmr');	=> vypije TMR, pokud uz zadna neni, cepne z kade 1 a vypije
// Potion_Manager('tmr', 1); => jen docepuje TMR z kade do flasky tu necha v baglu ale NEPIJE
//
////////////////////////////////////////////////////////////////////////////////

function Potion_Manager(Potion, Refill) {
  if (Refill) {
    var SmartSwitch = Potion_Refill;
  } else {
    var SmartSwitch = Potion_Drink;
  }
  switch (Potion) {
    case 'gb':
      SmartSwitch('Greater Blood', '0x0F0C', '0x0025', '0x0020');
      break;
    case 'tmr':
      SmartSwitch('Total Mana Refresh', '0x0F09', '0x0003', '0x003');
      break;
    case 'mr':
      SmartSwitch('Mana Refresh', '0x0F09', '0x0005', '0x005');
      break;
    case 'gs':
      SmartSwitch('Greater Strength', '0x0F09', '0x0000', '0x0481');
      break;
    case 'gh':
      SmartSwitch('Greater Heal', '0x0F0C', '0x0000', '0x08A7');
      break;
    case 'gc':
      SmartSwitch('Greater Cure', '0x0F07', '0x0000', '0x0842');
      break;
    case 'tr':
      SmartSwitch('Total Refresh', '0x0F0B', '0x0000', '0x014D');
      break;
    case 'sh':
      SmartSwitch('Shrink', '0x0F09', '0x045E', '0x0724');
      break;
    case 'dp':
      SmartSwitch('Deadly Poison', '0x0F0A', '0x0000', '0x08A2');
      break;
    case 'in':
      SmartSwitch('Invisibility', '0x0F09', '0x0000', '0x000');
      break;
    case 'lb':
      SmartSwitch('Lava Bomb', '0x0F0D', '0x00E', '0x00E');
      break;
    case 'ni':
      SmartSwitch('Nightsight', '0x0F06', '0x0000', '0x03C4');
      break;
    case 'ga':
      SmartSwitch('Greater Agility', '0x0F08', '0x0000', '0x00BD');
      break;
    case 'ag':
      SmartSwitch('Agility', '0x0F08', '0x0000', '0x00BF');
      break;
    case 'cu':
      SmartSwitch('Cure', '0x0F07', '0x0000', '0x0090');
      break;
    case 'he':
      SmartSwitch('Heal', '0x0F0C', '0x0000', '0x08A8');
      break;
    case 'ge':
      SmartSwitch('Greater Explosion', '0x0F0D', '0x0000', '0x0018');
      break;
    case 'gp':
      SmartSwitch('Greater Poison', '0x0F0A', '0x0000', '0x08A1');
      break;
    case 'lp':
      SmartSwitch('Lesser Poison', '0x0F0A', '0x0000', '0x089F');
      break;
    case 'po':
      SmartSwitch('Poison', '0x0F0A', '0x0000', '0x08A0');
      break;
    case 'le':
      SmartSwitch('Lesser Explosion', '0x0F0D', '0x0000', '0x001A');
      break;
    case 'ex':
      SmartSwitch('Explosion', '0x0F0D', '0x0000', '0x0019');
      break;
    case 'ha':
      SmartSwitch('Hallucination', '0x0F06', '0x0B90', '0x0B90');
      break;
    case 'lh':
      SmartSwitch('Lesser Heal', '0x0F0C', '0x0000', '0x08A9');
      break;
    case 'lc':
      SmartSwitch('Lesser Cure', '0x0F07', '0x0000', '0x0091');
      break;
    case 're':
      SmartSwitch('Refresh', '0x0F0B', '0x0000', '0x014E');
      break;
    case 'st':
      SmartSwitch('Strength', '0x0F09', '0x0000', '0x0B87');
      break;
  }
}

function Potion_Drink(Potion_Name, Potion_Graphic, Potion_Color, Keg_Color) {
  var EmptyPotFixText = 'bottless|bottles|bottle';
  var VypitiPotkyText = 'You put the empty ' + EmptyPotFixText + ' in your pack.';
  if (Orion.Count(Potion_Graphic, Potion_Color) > 0) // nalitej potion
  {
    Orion.UseType(Potion_Graphic, Potion_Color);
    Orion.WaitJournal(VypitiPotkyText, Orion.Now(), Orion.Now() + 10000, 'sys|my');
    Orion.ClearJournal(VypitiPotkyText);
    return;
  } else {
    Orion.Print('Dosli potky zkusim cepnout');
    Potion_Refill(Potion_Name, Potion_Graphic, Potion_Color, Keg_Color);
    Orion.UseType(Potion_Graphic, Potion_Color);
    Orion.WaitJournal(VypitiPotkyText, Orion.Now(), Orion.Now() + 10000, 'sys|my');
    Orion.ClearJournal(VypitiPotkyText);
  }
}

function Potion_Refill(Potion_Name, Potion_Graphic, Potion_Color, Keg_Color) {
  var PotionFixText = 'potion|Potion';
  var NacepovaniText = 'You put the ' + Potion_Name + ' ' + PotionFixText + ' in your pack.';
  if (Orion.Count('0x1843', Keg_Color) < 1) // plny keg
  {
    Orion.Print('NEMAM KEG');
    return;
  } else {
    if (Orion.Count('0x0F0E', '0x0000') < 1) {
      Orion.Print('NEMAM PRAZDNY FLASKY!!');
      return;
    } else {
      Orion.WaitTargetType('0x0F0E', '0x0000');
      Orion.UseType('0x1843', Keg_Color);
      Orion.WaitJournal(NacepovaniText, Orion.Now(), Orion.Now() + 10000, 'sys|my');
      Orion.ClearJournal(NacepovaniText);
      Orion.Print('Máš: ' + Orion.Count(Potion_Graphic, Potion_Color) + 'x ' + Potion_Name);
      Orion.Wait(500);
    }
  }
}
