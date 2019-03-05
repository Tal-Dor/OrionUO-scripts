////////////////////////////////////////////////////////////////////////////////
//                             ~ Refill Manager ~                             //
//                             - Taldor / Quin -                              //
////////////////////////////////////////////////////////////////////////////////
//
// RefillManager:
// Doplni itemy do baglu kterej si vyberes targetem nezpomenout na zacatku scriptu
// v sekci NASTAVENI mnozstvi u jednotlivych veci kdo si chce pohrat muze si
// nastavit i X,Y souradnice kam presne RM(RefillManager) bude kazdy item v
// baglu polozen.Defaultne jsou vsechny itemy nastaveny na 0 kusu.
// Napriklad:
// chcu jen 50 obycejnych regu,3 GC potek a 100 band =>
// Je potreba nastavit useBag1,useBag2 a useBag3 = 1, z techto 3 akorat potrebujeme
// brat itemy, a potom nezapomenout v Items na mnozstvi!
//  ------------------------------------
//    var Items = [
//    // Mage regy
//    // Jmeno, Typ, Barva, >>> Mnozstvi <<<, X, Y, Od kud?
//    ["Black Pearls", "0x0F7A", "0x0000", >>> 50 <<<, 29, 50, Bag1],
//    ...
//    ...
//    ["Greater Cure Potion", "0x0F07", "0x0000", >>> 3 <<<, 100, 100, Bag4],
//    ...
//    ["clean bandages", "0x0E21", "0x0000", >>> 100 <<<, 120, 115, Bag6],
// ------------------------------------
// vsude kde je mnozstvi = tak to script ignoruje.
// pokud chces nastavit nove ID nejakyho refill batohu tak v Orion assistant:
// zalozka List -> Objects a bud vybrat novy serial ID zde manualne nebo object
// vymazat a pri pristim pusteni scriptu se zepta na novy bagl automaticky.
//
// RefillManagerConfig:
// --- pro pokrocilejsi uzivatele:
// Pokud ti nejaky item ci cela sekce chybi pouzij tento RMC(RefillManagerConfig) script
// Slouzi k vygenerovani dalsich polozek pro pole 'var Items' k hlavnimu scriptu
// RefillManager(), po spusteni staci oznacit jednotlive veci co chces pridat a
// pro ukonceni jako cil misto itemu vyberes svoji postavu. Na konci script vygeneruje
// nove textove okno z ktereho si zkopirujes jednotlive polozky do RefillManager()
// je zde potreba zmenit BagX na aktualni cislo baglu podle sekce pod kterou ten
// dany item spada.
//    Dale je mozno tento script pouzit pro rychle vygenerovani X,Y souradnic itemu:
// 1. RUCNE si naplnis refill baglik co mas u sebe a vsechno si usporadas a zarovnas.
// 2. Pustis RefillManagerConfig() a postupne projedes VSECHNY itemy co tam mas.
// 3. Z textoveho pole si vezmes jednotlive X,Y souradnice a prepises stavajici
//    v hlavnim scriptu RefillManager()
// 4. Pristi spusteni RefillManager() uz bude davat itemy presne jako 1. rucni plneni
//
// Pozn : script neumi (zatim) offset usporadani stejneho typu itemu vedle sebe
// tim myslim ze kdyz mas napriklad 5 GC potionu tak je nedokaze dat X-X-X-X-X
// ale budou vsechny naskladane na sobe podle X,Y souradnice v 'var Items'.
//
// SaveCheck:
// sub-funkce pro world save check, nepousti se samotne :P
//
// Pouziti:
// Hotkey -> Run script :
// RefillManager()
// RefillManagerConfig()
//
////////////////////////////////////////////////////////////////////////////////

function RefillManager() {
  // ------------ NASTAVENI - CTI popis u kazdeho 'var' ! ------------ //

  //Nastav cestu k nejakemu *.wav souboru.
  var AlarmSound = "C:/Games/UO/DP/OrionUO/OA/Scripts/attention.wav"

  //Jmena objektu ktere uvidis v OA menu: Lists->Objects.
  //Neni potreba menit, pokud nechces nejake jine jmena objektu.
  var TargetBag = "RM_MyBag"
  var SourceChest = "RM_RefillChest";
  var Bag1 = "RM_MageBag";
  var Bag2 = "RM_NecroBag";
  var Bag3 = "RM_ScrollsBag";
  var Bag4 = "RM_PotionsBag";
  var Bag5 = "RM_JewelryBag";
  var Bag6 = "RM_MixBag";

  // Chces doplnovat Mage regy z Bag1? ANO = 1 / NE = 0
  var useBag1 = 0;
  // Chces doplnovat Necro regy z Bag2? ANO = 1 / NE = 0
  var useBag2 = 0;
  // Chces doplnovat Scrolly z Bag3? ANO = 1 / NE = 0
  var useBag3 = 0;
  // Chces doplnovat Kade+potiony z Bag4? ANO = 1 / NE = 0
  var useBag4 = 0;
  // Chces doplnovat Sperky z Bag5? ANO = 1 / NE = 0
  var useBag5 = 0;
  // Chces doplnovat MIX veci z Bag6? ANO = 1 / NE = 0
  var useBag6 = 0;

  var Items = [
    // Mage regy
    // Jmeno, Typ, Barva, Mnozstvi, X, Y, Od kud?
    ["Black Pearls", "0x0F7A", "0x0000", 0, 29, 50, Bag1],
    ["Blood Moss", "0x0F7B", "0x0000", 0, 29, 50, Bag1],
    ["Garlic", "0x0F84", "0x0000", 0, 29, 50, Bag1],
    ["Ginseng", "0x0F85", "0x0000", 0, 29, 50, Bag1],
    ["Mandrake Roots", "0x0F86", "0x0000", 0, 29, 50, Bag1],
    ["Nightshade", "0x0F88", "0x0000", 0, 29, 50, Bag1],
    ["Spider's Silk", "0x0F8D", "0x0000", 0, 29, 50, Bag1],
    ["Sulfurous Ash", "0x0F8C", "0x0000", 0, 29, 50, Bag1],
    // Necro regy
    // Jmeno, Typ, Barva, Mnozstvi, X, Y, Od kud?
    ["Batwings", "0x0F78", "0x0000", 0, 29, 100, Bag2],
    ["Blackmoor", "0x0F79", "0x0000", 0, 29, 100, Bag2],
    ["Bloodspawn", "0x0F7C", "0x0000", 0, 29, 100, Bag2],
    ["Bones", "0x0F7E", "0x0000", 0, 29, 100, Bag2],
    ["Brimstone", "0x0F7F", "0x0000", 0, 29, 100, Bag2],
    ["Daemon Blood", "0x0F7D", "0x0000", 0, 29, 100, Bag2],
    ["Daemon Bones", "0x0F80", "0x0000", 0, 29, 100, Bag2],
    ["Executioner's Cap", "0x0F83", "0x0000", 0, 29, 100, Bag2],
    ["Eyes of Newt", "0x0F87", "0x0000", 0, 29, 100, Bag2],
    ["Fertile Dirt", "0x0F81", "0x0000", 0, 29, 100, Bag2],
    ["Obsidian", "0x0F89", "0x0000", 0, 29, 100, Bag2],
    ["Pumice", "0x0F8B", "0x0000", 0, 29, 100, Bag2],
    ["Serpent's Scales", "0x0F8E", "0x0000", 0, 29, 100, Bag2],
    ["Volcanic Ash", "0x0F8F", "0x0000", 0, 29, 100, Bag2],
    ["Wyrm's Hearts", "0x0F91", "0x0000", 0, 29, 100, Bag2],
    // Scrolly
    // Jmeno, Typ, Barva, Mnozstvi, X, Y, Od kud?
    ["Blade Spirits Scroll", "0x1F4D", "0x0000", 0, 50, 20, Bag3],
    ["Dispel Scroll", "0x1F55", "0x0000", 0, 50, 20, Bag3],
    ["Energy Bolt Scroll", "0x1F56", "0x0000", 0, 50, 20, Bag3],
    ["Flamestrike Scroll", "0x1F5F", "0x0000", 0, 50, 20, Bag3],
    ["Greater Heal Scroll", "0x1F49", "0x0000", 0, 50, 20, Bag3],
    ["Harm Scroll", "0x1F38", "0x0000", 0, 50, 20, Bag3],
    ["Magic Reflection Scroll", "0x1F50", "0x0000", 0, 50, 20, Bag3],
    ["Night Sight Scroll", "0x1F33", "0x0000", 0, 50, 20, Bag3],
    ["Paralyze Field Scroll", "0x1F5B", "0x0000", 0, 50, 20, Bag3],
    ["Paralyze Scroll", "0x1F52", "0x0000", 0, 50, 20, Bag3],
    ["Reactive Armor Scroll", "0x1F2D", "0x0000", 0, 50, 20, Bag3],
    ["Recall Scroll", "0x1F4C", "0x0000", 0, 50, 20, Bag3],
    ["Resurrection Scroll", "0x1F67", "0x0000", 0, 50, 20, Bag3],
    ["Teleport Scroll", "0x1F42", "0x0000", 0, 50, 20, Bag3],
    ["Wall of Stone Scroll", "0x1F44", "0x0000", 0, 50, 20, Bag3],
    // Kade
    // Jmeno, Typ, Barva, Mnozstvi, X, Y, Od kud?
    ["Nadoba s Greater Blood", "0x1843", "0x0020", 0, 100, 100, Bag4],
    ["Nadoba s Greater Cure", "0x1843", "0x0842", 0, 100, 100, Bag4],
    ["Nadoba s Greater Heal", "0x1843", "0x08A7", 0, 100, 100, Bag4],
    ["Nadoba s Greater Strength", "0x1843", "0x0481", 0, 100, 100, Bag4],
    ["Nadoba s Nightsight", "0x1843", "0x03C4", 0, 100, 100, Bag4],
    ["Nadoba s Shrink", "0x1843", "0x0724", 0, 100, 100, Bag4],
    ["Nadoba s Total Mana Refresh", "0x1843", "0x0003", 0, 100, 100, Bag4],
    ["Nadoba s Total Refresh", "0x1843", "0x014D", 0, 100, 100, Bag4],
    // Potiony
    // Jmeno, Typ, Barva, Mnozstvi, X, Y, Od kud?
    ["Greater Blood potion", "0x0F0C", "0x0025", 0, 100, 100, Bag4],
    ["Greater Cure Potion", "0x0F07", "0x0000", 0, 100, 100, Bag4],
    ["Greater Heal Potion", "0x0F0C", "0x0000", 0, 100, 100, Bag4],
    ["Greater Strength Potion", "0x0F09", "0x0000", 0, 100, 100, Bag4],
    ["Shrink", "0x0F09", "0x045E", 0, 100, 100, Bag4],
    ["Total Mana Refresh Potion", "0x0F09", "0x0003", 0, 100, 100, Bag4],
    ["Total Refresh potion", "0x0F0B", "0x0000", 0, 100, 100, Bag4],
    //Sperky
    // Jmeno, Typ, Barva, Mnozstvi, X, Y, Od kud?
    ["Reflex Ring", "0x108A", "0x0496", 0, 10, 5, Bag5],
    ["Great Gold Ring", "0x108A", "0x0000", 0, 10, 10, Bag5],
    ["Great Reflex Ring", "0x108A", "0x0B21", 0, 10, 15, Bag5],
    ["Great Reflex Ring 2", "0x108A", "0x0B98", 0, 10, 20, Bag5],
    ["Heart of Dark Forest", "0x136C", "0x0B89", 0, 10, 30, Bag5],
    //MIX
    // Jmeno, Typ, Barva, Mnozstvi, X, Y, Od kud?
    ["clean bandages", "0x0E21", "0x0000", 0, 120, 115, Bag6],
    ["empty bottles", "0x0F0E", "0x0000", 0, 120, 115, Bag6],
    ["crossbow bolt", "0x1BFB", "0x0000", 0, 120, 115, Bag6],
    ["arrow", "0x0F3F", "0x0000", 0, 120, 115, Bag6],
    ["Ginseng Salad", "0x09EC", "0x06AB", 0, 120, 115, Bag6],
    ["Deepwater Fish", "0x09CD", "0x084C", 0, 120, 115, Bag6],
    ["White Fish", "0x09CD", "0x0482", 0, 120, 115, Bag6],
    ["Wondrous Fish", "0x09CD", "0x0850", 0, 120, 115, Bag6],
    ["Lute of Reactive Armor", "0x0EB3", "0x0000", 0, 120, 115, Bag6],
    ["Drum of Protection", "0x0E9C", "0x0000", 0, 120, 115, Bag6],
    ["Lap Harp of Bless", "0x0EB2", "0x0000", 0, 120, 115, Bag6]
  ];

  // ------------ HLAVNI KOD - NEMENIT NIC pokud nevis co delas! ------------ //

  var Index, Resource, ResourceObject, Quantity;

  Orion.CharPrint(self, 1153, "Kterej bagl naplnit?")
  Orion.AddObject(TargetBag);
  while (Orion.HaveTarget()) {
    Orion.Wait(100);
  }
  SaveCheck();
  if (Orion.GetSerial(SourceChest) == '0x00000000') {
    Orion.AddObject(SourceChest);
    Orion.CharPrint(self, 1153, "V ktere bedne jsou bagly se zasobama?");
    while (Orion.HaveTarget()) {
      Orion.Wait(100);
    }
    Orion.Print('0x0123', "\"" + SourceChest + "\" pridan do Lists->Objects.");
  }
  SaveCheck();
  if (Orion.GetSerial(Bag1) == '0x00000000' && useBag1 == 1) {
    Orion.AddObject(Bag1);
    Orion.CharPrint(self, 1153, "V kterem baglu jsou Mage Regy?");
    while (Orion.HaveTarget()) {
      Orion.Wait(100);
    }
    Orion.Print('0x0123', "\"" + Bag1 + "\" pridan do Lists->Objects.");
  }
  SaveCheck();
  if (Orion.GetSerial(Bag2) == '0x00000000' && useBag2 == 1) {
    Orion.AddObject(Bag2);
    Orion.CharPrint(self, 1153, "V kterem baglu jsou Necro Regy?");
    while (Orion.HaveTarget()) {
      Orion.Wait(100);
    }
    Orion.Print('0x0123', "\"" + Bag2 + "\" pridan do Lists->Objects.");
  }
  SaveCheck();
  if (Orion.GetSerial(Bag3) == '0x00000000' && useBag3 == 1) {
    Orion.AddObject(Bag3);
    Orion.CharPrint(self, 1153, "V kterem baglu jsou scrolly?");
    while (Orion.HaveTarget()) {
      Orion.Wait(100);
    }
    Orion.Print('0x0123', "\"" + Bag3 + "\" pridan do Lists->Objects.");
  }
  SaveCheck();
  if (Orion.GetSerial(Bag4) == '0x00000000' && useBag4 == 1) {
    Orion.AddObject(Bag4);
    Orion.CharPrint(self, 1153, "V kterem baglu jsou kade+potiony?");
    while (Orion.HaveTarget()) {
      Orion.Wait(100);
    }
    Orion.Print('0x0123', "\"" + Bag4 + "\" pridan do Lists->Objects.");
  }
  SaveCheck();
  if (Orion.GetSerial(Bag5) == '0x00000000' && useBag5 == 1) {
    Orion.AddObject(Bag5);
    Orion.CharPrint(self, 1153, "V kterem baglu jsou sperky?");
    while (Orion.HaveTarget()) {
      Orion.Wait(100);
    }
    Orion.Print('0x0123', "\"" + Bag5 + "\" pridan do Lists->Objects.");
  }
  SaveCheck();
  if (Orion.GetSerial(Bag6) == '0x00000000' && useBag6 == 1) {
    Orion.AddObject(Bag6);
    Orion.CharPrint(self, 1153, "V kterem baglu jsou MIX veci?");
    while (Orion.HaveTarget()) {
      Orion.Wait(100);
    }
    Orion.Print('0x0123', "\"" + Bag6 + "\" pridan do Lists->Objects.");
  }
  SaveCheck();
  Orion.OpenContainer(TargetBag, 1000);
  Orion.OpenContainer(SourceChest, 1000);
  if (useBag1 == 1)
    Orion.OpenContainer(Bag1, 1000);
  if (useBag2 == 1)
    Orion.OpenContainer(Bag2, 1000);
  if (useBag3 == 1)
    Orion.OpenContainer(Bag3, 1000);
  if (useBag4 == 1)
    Orion.OpenContainer(Bag4, 1000);
  if (useBag5 == 1)
    Orion.OpenContainer(Bag5, 1000);
  if (useBag6 == 1)
    Orion.OpenContainer(Bag6, 1000);
  for (Index = 0; Index < Items.length; Index++) {
    if (Items[Index][3] == 0) {
      continue;
    }
    Resource = Orion.FindType(Items[Index][1], Items[Index][2], TargetBag);
    if (Resource.length != 0) {
      ResourceObject = Orion.FindObject(Resource[0]);
      if (Items[Index][3] > ResourceObject.Count()) {
        Quantity = Items[Index][3] - ResourceObject.Count();
      } else {
        continue;
      }
    } else {
      Quantity = Items[Index][3];
    }
    Resource = Orion.FindType(Items[Index][1], Items[Index][2], Items[Index][6]);
    if (Resource.length != 0) {
      ResourceObject = Orion.FindObject(Resource[0]);
      if (ResourceObject.Count() >= Quantity) {
        if (Items[Index][3] != Quantity) {
          Orion.MoveItem(ResourceObject.Serial(), Quantity, TargetBag);
        } else {
          Orion.MoveItem(ResourceObject.Serial(), Quantity, TargetBag, Items[Index][4], Items[Index][5], 0);
        }
        SaveCheck();
        Orion.Wait(500);
      } else {
        Orion.Print("Dosly zasoby: " + Items[Index][0] + "!");
        Orion.PlayWav(AlarmSound);
        //return;
        continue;
      }
    } else {
      Orion.Print("Dosly zasoby: " + Items[Index][0] + "!");
      Orion.PlayWav(AlarmSound);
      //return;
      continue;
    }
  }
  Orion.CharPrint(self, 1153, "Refill hotov! Enjoy.");
}

//sub-funkce pro world save check
function SaveCheck() {
  var time = Orion.Now() + 20000;
  if (Orion.InJournal("World save has been initiated")) {
    Orion.ClearJournal("World save has been initiated|baglicek");
    Orion.Click(backpack);
    do {
      Orion.Wait(50);
    }
    while (!Orion.InJournal("baglicek") && Orion.Now() < time && !Player.Dead());
  }
}

function RefillManagerConfig() {
  var Item;
  TextWindow.Clear();
  while (!Player.Dead()) {
    Orion.CharPrint("self", 1153, "Kterou vec chces pridat?")
    Orion.AddObject("Item");
    while (Orion.HaveTarget()) {
      Orion.Wait(100);
    }
    if (Orion.GetSerial("Item") != Player.Serial()) {
      Item = Orion.FindObject("Item");
      Orion.RequestName(Item.Serial(), 1000);
      Orion.Print("Added " + Item.Name() + "!");
      TextWindow.Print("[\"" + Item.Name() + "\", \"" + Item.Graphic() + "\", \"" + Item.Color() + "\", " + Item.Count() + ", " + Item.X() + ", " + Item.Y() + ", BagX],");
    } else {
      Orion.CharPrint("self", 1153, "Hotovo! zkopiruj si vysledek z okna!");
      TextWindow.Open();
      return;
    }
  }
}
