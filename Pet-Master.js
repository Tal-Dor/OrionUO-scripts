/*

////////////////////////////////////////////////////////////////////////////////
//                               ~ Pet Master ~                               //
//                             - Taldor / Quin -                              //
////////////////////////////////////////////////////////////////////////////////

Univerzalni script prejmenovani a celkove ovladani petu.

Pouziti:

Renamer:
- prejmenuje vsechny pety + summony ktere vlastnite v urcitem radiusu, nahodne jmena bere z NamesPool
- bud primo na hotkey (run script) nebo mozno pouzit i v summon creature makru Renamer();

PetCommander:
Hotkey -> External code :
PetCommander('Come');
PetCommander('Stop');
PetCommander('Go');
etc..

KillWatcher:
- posle vsechny vase pety zabit vas target, hlida dokud cil neni mrtvy a okamzite je zastavi press "All Stop"
jakmile target umre, vhodne hlavne pro nekro summony jako Death Vortex a podobne neposlusne summy kteri si na DP
delaji co chcou pokud nedostanou po kill nejaky jiny prikaz :P
- pokud se nepouziva dohromady s PvM/PvP target scriptem ktery pouziva global_enemy, je potreba zmenit var Target

Pouziti:
Hotkey -> Run script :
KillWatcher();
*/
function Renamer() {
  var NamesPool = ['Andres', 'Blanca', 'Carlos', 'Dolores', 'Enrique', 'Felicia', 'Guillermo', 'Hilda', 'Ignacio', 'Jimena', 'Kevin', 'Linda', 'Marty', 'Nora', 'Olaf', 'Damrey',
    'Haikui', 'Kirogi', 'Tembin', 'Bolaven', 'Sanba', 'Jelawat', 'Ewiniar', 'Malaksi', 'Gaemi', 'Prapiroon', 'Maria', 'SonTinh', 'Bopha', 'Wukong', 'Sonamu',
    'Shanshan', 'Yagi', 'Leepi', 'Bebinca', 'Rumbia', 'Soulik', 'Cimaron', 'Jebi', 'Mangkhut', 'Utor', 'Trami', 'Yutu', 'Toraji', 'Usagi', 'Pabuk', 'Wutip', 'Sepat',
    'Fitow', 'Danas', 'Nari', 'Wipha', 'Francisco', 'Lekima', 'Krosa', 'Haiyan', 'Podul', 'Lingling', 'Kaziki', 'Faxai', 'Peipah', 'Tapah', 'Mitag', 'Hagibis', 'Neoguri',
    'Rammasun', 'Matmo', 'Halong', 'Nakri', 'Fengshen', 'Kalmaegi', 'Kanmuri', 'Phanfone', 'Vongfong', 'Nuri', 'Sinlaku', 'Hagupit', 'Jangmi', 'Mekkhala', 'Higos',
    'Bavi', 'Maysak', 'Haishen', 'Noul', 'Dolphin', 'Kujira', 'Chanhom', 'Linfa', 'Nangka', 'Soudelor', 'Molave', 'Goni', 'Morakot', 'Etau', 'Vamco', 'Krovanh', 'Dujuan',
    'Mujigae', 'Choiwan', 'Koppu', 'Ketsana', 'Parma', 'Melor', 'Nepartak', 'Lupit', 'Mirinae', 'Nida', 'Omais', 'Conson', 'Chanthu', 'Dianmu', 'Mindulle', 'Lionrock',
    'Kompasu', 'Namtheun', 'Malou', 'Meranti', 'Fanapi', 'Malakas', 'Megi', 'Chaba', 'Aere', 'Songda', 'Sarika', 'Haima', 'Meari', 'Tokage', 'Muifa', 'Merbok',
    'Nanmadol', 'Talas', 'Noru', 'Kulap', 'Roke', 'Sonca', 'Nesat', 'Haitang', 'Nalgae', 'Banyan', 'Washi', 'Pakhar', 'Sanvu', 'Mawar', 'Guchol', 'Patricia', 'Rick',
    'Sandra', 'Terry', 'Vivian', 'Waldo', 'Xina', 'York', 'Zelda', 'Agatha', 'Blas', 'Celia', 'Darby', 'Estelle', 'Frank', 'Georgette', 'Howard', 'Isis', 'Javier', 'Kay', 'Lester',
    'Madeline', 'Newton', 'Orlene', 'Paine', 'Roslyn', 'Seymour', 'Tina', 'Virgil', 'Winifred', 'Xavier', 'Yolanda', 'Zeke', 'Adrian', 'Beatriz', 'Calvin', 'Dora', 'Eugene',
    'Fernanda', 'Greg', 'Hilary', 'Irwin', 'Jova', 'Kenneth', 'Lidia', 'Max', 'Norma', 'Otis', 'Pilar', 'Ramon', 'Selma', 'Todd', 'Veronica', 'Wiley', 'Xina', 'York', 'Zelda',
    'Aletta', 'Bud', 'Carlotta', 'Daniel', 'Emilia', 'Fabio', 'Gilma', 'Hector', 'Ileana', 'John', 'Kristy', 'Lane', 'Miriam', 'Norman', 'Olivia', 'Paul', 'Rosa', 'Sergio', 'Tara',
    'Vicente', 'Willa', 'Xavier', 'Yolanda', 'Zeke', 'Alvin', 'Barbara', 'Cosme', 'Dalila', 'Erick', 'Flossie', 'Gil', 'Henriette', 'Ivo', 'Juliette', 'Kiko', 'Lorena', 'Manuel',
    'Narda', 'Octave', 'Priscilla', 'Raymond', 'Sonia', 'Tico', 'Velma', 'Wallis', 'Xina', 'York', 'Zelda', 'Amanda', 'Boris', 'Cristina', 'Douglas', 'Elida', 'Fausto', 'Genevieve',
    'Hernan', 'Iselle', 'Julio', 'Karina', 'Lowell', 'Marie', 'Norbert', 'Odile', 'Polo', 'Rachel', 'Simon', 'Trudy', 'Vance', 'Winnie', 'Xavier', 'Yolanda', 'Zeke', 'Talim',
    'Doksuri', 'Khanun', 'Vicente', 'Saola'
  ];
  var Pets = [];
  var UsedNamesTXT = 'C:/Games/UO/DP/OA/UsedNames.txt';
  var file = Orion.NewFile();
  Orion.IgnoreReset();

  var FindPets = Orion.FindType("!0x0190|!0x0191", "-1", "ground", "near|live", 22, "blue|gray|criminal|orange|red");
  if (!FindPets.length) {
    Orion.Print('-1', 'no pets found, resetting ignore list');
    Orion.IgnoreReset();
    FindPets = Orion.FindType("!0x0190|!0x0191", "-1", "ground", "near|live", 22, "blue|gray|criminal|orange|red");
  }
  while (FindPets.length) {
    var CurrentPet = Orion.FindObject(FindPets[0]);
    if (CurrentPet.CanChangeName()) {
      Pets.push(FindPets);
      Orion.Print('-1', '--- added pet : ' + CurrentPet.Name());
      Orion.Print('Number of pets : ' + Pets.length);

    }
    Orion.Ignore(FindPets);
    FindPets = Orion.FindType("!0x0190|!0x0191", "-1", "ground", "near|live", 22, "blue|gray|criminal|orange|red");
  }
  if (Pets.length) {
    file.Remove(UsedNamesTXT);
    if (file.Append(UsedNamesTXT)) {
      file.WriteLine(Pets.length);
      for (var i = 0; i < Pets.length; i++) {
        CurrentPet = Orion.FindObject(Pets[i]);
        var PickRandom = Math.floor(Math.random() * (NamesPool.length));
        Orion.RenameMount(CurrentPet.Serial(), NamesPool[PickRandom]);
        file.WriteLine(CurrentPet.Serial() + ' ' + NamesPool[PickRandom]);
        NamesPool.splice(PickRandom, 1);
      }
      file.Close();
    }
  }
}


function PetCommander(command) {
  var Pets = [];
  var UsedNamesTXT = 'C:/Games/UO/DP/OA/UsedNames.txt';
  var file = Orion.NewFile();
  var TargetHelper = 0;

  if (file.Open(UsedNamesTXT)) {
    var count = file.ReadLine();
    if (count > 0) {
      for (var c = 0; c < count; c++) {
        var qq = ([file.Read(), file.Read()]);
        Pets.push(qq);
        Orion.Print(qq);
      }
      file.Close();
    } else {
      Orion.Print('File empty or corrupted: ' + UsedNamesTXT);
      file.Close();
      return;
    }
  } else {
    Orion.Print('File not found: ' + UsedNamesTXT);
    return;
  }
  for (var i = 0; i < Pets.length; i++) {
    if (Orion.FindObject(Pets[i][0])) {
      switch (command) {
        case 'Come':
        case 'Stay':
        case 'Stop':
        case 'Drop':
          Orion.Say('::: ' + Pets[i][1] + ' ' + command + ' :::');
          break;
        case 'Kill':
          Orion.WaitTargetObject(Orion.GetGlobal('global_enemy'));
          Orion.Say('::: ' + Pets[i][1] + ' ' + command + ' :::');
          Orion.WaitForTarget(1000);
          while (Orion.HaveTarget()) {
            Orion.Wait(50);
          }
          Orion.Wait(250);
          break;
        case 'Go':
          if (TargetHelper == 0) {
            Orion.Say('::: ' + Pets[i][1] + ' ' + command + ' :::');
            Orion.WaitForTarget(1000);
            while (Orion.HaveTarget()) {
              Orion.Wait(50);
            }
            TargetHelper = 1;
            Orion.Print('--target set!---');
          } else {
            Orion.WaitTargetTile(lasttile);
            Orion.Say('::: ' + Pets[i][1] + ' ' + command + ' :::');
            Orion.WaitForTarget(1000);
            while (Orion.HaveTarget()) {
              Orion.Wait(50);
            }
          }
          Orion.Wait(250);
          break;
        case 'Friend':
        case 'Follow':
        case 'Guard':
        case 'Transfer':
          if (TargetHelper == 0) {
            Orion.AddObject('FFGT');
            while (Orion.HaveTarget()) {
              Orion.Wait(50);
            }
            TargetHelper = 1;
            Orion.Print('--target set!---');
          }
          Orion.WaitTargetObject('FFGT');
          Orion.Say('::: ' + Pets[i][1] + ' ' + command + ' :::');
          Orion.Wait(250);
          break;

      }
    }
  }
  TargetHelper = 0;
}

function KillWatcherSub() {
  var Target = Orion.FindObject(Orion.GetGlobal('global_enemy'));
  if (Target) {
    PetCommander('Kill');
  }
  Orion.Wait(500);
  while (Target.Exists()) {
    Orion.SetGlobal('KillWatcher_loop', 1);
    Orion.Wait(100);
  }
  Orion.SetGlobal('KillWatcher_loop', 0);
  PetCommander('Stop');
}

function KillWatcher() {
  if (Orion.GetGlobal('KillWatcher_loop') == 1) {
    //Orion.Print('Target not dead yet,restarting loop');
    Orion.Terminate('KillWatcherSub');
    Orion.SetGlobal('KillWatcher_loop', 0);
    Orion.Exec('KillWatcherSub');
  } else {
    Orion.Exec('KillWatcherSub');
  }
}
