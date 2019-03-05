////////////////////////////////////////////////////////////////////////////////
//                               ~ Autoloot ~                                 //
//                             - Taldor / Quin -                              //
////////////////////////////////////////////////////////////////////////////////
//
// Autoloot vsech tel kolem sebe, pouziva lootlist kde se nastavi pouze veci co chcete lootit,
// popripade jde pouzit ignorelist, jde zapnout i skinning
//
// Pouziti:
// Hotkey -> Run script :
// AutoLoot()
// 
// do 'lootlist' popripade do 'ignorelist' pokud chcete pouzivat loot all je potreba
// pridat veci ktere (ne)chcete lootit napr pro DP:
// Graphic: 0x0E76  Color: 0x049A Comment: Loot
//
// takze list content bude v ty zalozce vypadat takhle:
//
// 0x0E76 : 0x049A //Loot
// 0x0E80 : 0x0123 //Dark Chest of Wonders
// 0x1F13 : 0x0B87 //Skillpoint 1
// 0x1F13 : 0x0026 //Skillpoint 2
// 0x1F13 : 0x0005 //Skillpoint 3
// 0x1F13 : 0x0054 //Skillpoint 4
//
////////////////////////////////////////////////////////////////////////////////
function AutoLoot() {
  //1 - loot all; 0 - loot prioritized items
  var all = 0;

  //1 - ignore list, 0 - do not ignore
  var clear = 0;

  //1 - use skinning
  var useSkining = 0;

  //name of your lootlist
  var listName = 'lootlist';

  //recursive search in a corpse
  //name of the list of bags
  //If corpses contain bags and more bags within those bags
  //create a list with possible bag types to check inside those too
  var bagsList = 'bagsList';

  FastLoot2(listName, all, clear, useSkining, bagsList);
}

function FastLoot(listName, all, clear, useSkining, bagsList) {
  var corpse = FindCorpse(null);

  if (corpse == null) {
    Orion.ResetIgnoreList();
    Orion.IgnoreReset();
    Orion.Print('-1', 'No more corpses found. Reseting list.');
  } else {
    Orion.AddObject('corpse', corpse.Serial());
    if (useSkining == 1)
      Skining();
    Orion.UseObject('corpse');
    Orion.Wait(200);
    LootLag(null);
    Loot(listName, all, clear, useSkining, bagsList);
  }
}

function FastLoot2(listName, all, clear, useSkining, bagsList) {
  var corpse = FindCorpse(null);

  if (corpse == null) {
    Orion.ResetIgnoreList();
    Orion.IgnoreReset();
    Orion.Print('-1', 'No more corpses found. Reseting list.');
  }
  while (corpse) {
    Orion.AddObject('corpse', corpse.Serial());
    if (useSkining == 1)
      Skining();
    Orion.UseObject('corpse');
    Orion.Wait(200);
    LootLag(null);
    Loot(listName, all, clear, useSkining, bagsList);
    Orion.Wait(500);
    corpse = FindCorpse(null);
  }
}

function FindCorpse(dummy) {
  var list = Orion.FindType('0x0ECD|0x2006|0x0ECA|0x0ECC|0x0E40|0x0E41|0x0ECE', '-1', ground, 'fast', '2');

  if (list.length) {
    return Orion.FindObject(list[0]);
  }
  return null;
}

function LootLag(dummy) {
  var timer = Orion.Now() + 100;

  while (!Orion.FindType('-1', '-1', 'corpse').length && timer > Orion.Now())
    Orion.Wait(50);
}

function Loot(listName, all, clear, useSkining, bagsList) {
  //var bag = '0x0E75';
  var bag = '0x0E76';

  var lootBagList = Orion.FindType(bag);

  if (lootBagList.length)
    Orion.AddObject('lootpack', lootBagList[0]);
  else
    Orion.AddObject('lootpack', Orion.GetSerial(backpack));

  //if (!(Orion.FindObject('lootpack')))
  //{
  //	 Orion.Print('Lootpack not found, everything goes to backpack now');
  //	 Orion.AddObject('lootpack', Orion.GetSerial(backpack));
  //  }


  LootByFindList(listName, bagsList);

  if (all == 1) {
    if (clear == 1)
      Orion.UseIgnoreList('ignoreLoot');
    else
      Orion.ResetIgnoreList();

    LootAll();

    Orion.ResetIgnoreList();
  }

  if (useSkining == 1)
    Skining();
}

function Skining(dummy) {
  Orion.WaitTargetObject('corpse');
  Orion.UseType('0x0F52');
  Orion.Wait(600);
}

function LootItems(itemsToLoot, lootingContainer, lootListName, bagsList) {
  var bags = Orion.FindList(bagsList, lootingContainer);
  if (!itemsToLoot.length && !bags.length)
    return;

  Orion.Print('items to loot:  ' + itemsToLoot.length);
  Orion.Print('bags  to open:  ' + bags.length);
  if (bags.length) {
    for (var i = 0; i < bags.length; i++) {
      Orion.UseObject(bags[i]);
      Orion.Wait(1000);
      Orion.OpenContainer(bags[i], 1000);
      Orion.Wait(500);
      Orion.Print('opened ' + bags[i]);
      var list = Orion.FindList(lootListName, bags[i]);
      LootItems(list, bags[i], lootListName, bagsList);

    }
  }
  if (itemsToLoot.length)
    LootActual(itemsToLoot);
}

function LootActual(list) {
  for (var i = 0; i < list.length; i++) {
    if (Orion.GetDistance('corpse') > 2)
      return;

    Orion.MoveItem(list[i], 0, 'lootpack');
    Orion.Wait(500);
  }
}

function LootByFindList(listName, bagsList) {
  while (LootItems(Orion.FindList(listName, 'corpse'), 'corpse', listName, bagsList))
    Orion.Wait(50);
  Orion.Ignore('corpse');
}
