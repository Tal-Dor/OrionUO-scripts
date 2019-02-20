/*

////////////////////////////////////////////////////////////////////////////////
//                              ~ Bar Puller ~                                //
//                             - Taldor / Quin -                              //
////////////////////////////////////////////////////////////////////////////////

Vytahne status bary nepratel a posklada je na obrazovce, je nutne upravit
radek 30 popr 49  X,Y souradnice kde to ma zacinat (1185, 680 a 0, 560)

Pouziti:
Hotkey -> Run script :
BarPuller_PvP()
BarPuller_PvM()

*/


function BarPuller_PvP(){
var noto = Player.Notoriety();
Orion.Ignore(self, true);
 if(noto == 6){
            var serial = Orion.FindType('0xFFFF', '0xFFFF', ground, 'mobile|ignorefriends|human ', '20', 'blue|orange|red|gray|criminal');
    } else {
            var serial = Orion.FindType('0xFFFF', '0xFFFF', ground, 'mobile|ignorefriends|human ', '20', 'orange|red|gray|criminal');
    }

        for (var i = 0; i < serial.length; ++i) {
            if (i >= 10) break;
            Orion.ShowStatusbar(serial[i], 1185, 680-(60*i));
            Orion.Print(serial[i]);
            Orion.Wait(100);
        }
    Orion.Ignore(self, false);
}


function BarPuller_PvM(){
var noto = Player.Notoriety();
Orion.Ignore(self, true);
 if(noto == 6){
            var serial = Orion.FindType("!0x0190|!0x0191", "-1", "ground", "ignorefriends|mobile", 20, "gray|red");
    } else {
            var serial = Orion.FindType("!0x0190|!0x0191", "-1", "ground", "ignorefriends|mobile", 20, "gray|red");
    }

        for (var i = 0; i < serial.length; ++i) {
            if (i >= 10) break;
            Orion.ShowStatusbar(serial[i], 0, 560-(60*i));
            Orion.Print(serial[i]);
            Orion.Wait(100);
        }
    Orion.Ignore(self, false);
}
