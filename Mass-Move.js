/*

////////////////////////////////////////////////////////////////////////////////
//                              ~ Mass Move ~                                 //
//                             - Taldor / Quin -                              //
////////////////////////////////////////////////////////////////////////////////

Presouvani itemu od nekud nekam :p

Pouziti:
Hotkey -> Run script :
MassMove()

*/

function MassMove() {
    var itemToMove = "itemToMove";
    var containerMoveTo = "containerMoveTo";
    Orion.RemoveObject(itemToMove);
    Orion.RemoveObject(containerMoveTo);
    Orion.CancelTarget();
    var attempt = 0;

    Orion.Print("Select type of object which you want to move...");
    Orion.AddObject(itemToMove);
    while (true) {
        if (! Orion.HaveTarget() || attempt > 50) {
            break;
        }
        Orion.Wait(200);
        attempt++;
    }
    objType = Orion.FindObject(itemToMove).Graphic();
    containerFrom = Orion.FindObject(itemToMove).Container();

    if (Orion.FindObject(itemToMove)) {
        Orion.Print("Object type to move is selected. Type is: " + objType);
        Orion.Print("Container ID which contains items to move is: " + containerFrom);
    } else {
        Orion.Print("Object to move didn't selected till timeout, exiting...");
        return false;
    }

    Orion.Print("Select container to move to...");
    Orion.AddObject(containerMoveTo);
    attempt = 0;
    while (true) {
        if (! Orion.HaveTarget() || attempt > 50) {
            break;
        }
        Orion.Wait(200);
        attempt++;
    }

    if (Orion.FindObject(containerMoveTo)) {
        Orion.Print("Containter to move to is selected. ID is: " + Orion.FindObject(containerMoveTo).Serial());
    } else {
        Orion.Print("Container to move items to didn't selected till timeout, exiting...");
        return false;
    }

    var found = Orion.FindType(objType, -1, container=containerFrom);
    for (i = 0; i < found.length; i++) {
        Orion.MoveItem(found[i], -1, container=containerMoveTo);
        Orion.Wait(900);
    }
    Orion.Print("All items has been moved successfully!");
    return true;
}
