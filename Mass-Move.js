////////////////////////////////////////////////////////////////////////////////
//                              ~ Mass Move ~                                 //
//                             - Taldor / Quin -                              //
////////////////////////////////////////////////////////////////////////////////
//
// Presouvani itemu od nekud nekam :p
//
// Pouziti:
// Hotkey -> Run script :
// MassMove()
//
////////////////////////////////////////////////////////////////////////////////

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
    if (!Orion.HaveTarget() || attempt > 50) {
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
    if (!Orion.HaveTarget() || attempt > 50) {
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

  var found = Orion.FindType(objType, -1, container = containerFrom);
  for (i = 0; i < found.length; i++) {
    Orion.MoveItem(found[i], -1, container = containerMoveTo);
    Orion.Wait(900);
  }
  Orion.Print("All items has been moved successfully!");
  return true;
}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function GrabItem() {
	//OpenCorpse();
	if (!Orion.HaveTarget() )
	{
		var toMove = Orion.FindObject('toMove');
		if( toMove !== null | toMove !== 0 )
		{
			Orion.RemoveObject('toMove');
		}
		Orion.Print( '-1', 'Target something to grab.');
		Orion.AddObject('toMove');
		while(Orion.HaveTarget())
		{
			Orion.Wait('50');
		}
		toMove = Orion.FindObject('toMove');
		if ( toMove !== null ) {
			Orion.MoveItem( toMove.Serial(), 'all' , backpack);
		}
	}
}

function OrganizeFromList(frombag, tobag, listname, amount) {  //sub function for moving items around
	var item = Orion.FindList(listname, frombag);
	if ( item !== null ) {
		Orion.CharPrint('self', '906', 'moving items');
		for (var i = 0; i < item.length; i++) {
			Orion.MoveItem(item[i], amount, tobag);
			Orion.Wait(700);
		}
	}
	else
		Orion.CharPrint('self', '906', 'item not found');
}



function OrganizeToBackpack(listname, amount) {
	var frombag = Orion.FindObject('fromBag');
	if( frombag !== null | frombag !== 0 )
	{
		Orion.RemoveObject('fromBag');
	}
	Orion.Print( '-1', 'Target container to move to.');
	Orion.AddObject('fromBag');
	while(Orion.HaveTarget())
	{
		Orion.Wait('50');
	}
	frombag = Orion.FindObject('fromBag');
	if ( frombag !== null ) {
		OrganizeFromList( frombag.Serial(), backpack, listname, amount);
	}
}

function OrganizeFromBackpack(listname, amount) {
	var tobag = Orion.FindObject('toBag');
	if( tobag !== null | tobag !== 0 )
	{
		Orion.RemoveObject('toBag');
	}
	Orion.Print( '-1', 'Target container to move from.');
	Orion.AddObject('toBag');
	while(Orion.HaveTarget())
	{
		Orion.Wait('50');
	}
	tobag = Orion.FindObject('toBag');
	if ( tobag !== null ) {
		OrganizeFromList( backpack, tobag.Serial(), listname, amount);
	}
}

function OrganizeThisToThat(listname, amount) {
	Orion.RemoveObject('MoveFrom');
	Orion.RemoveObject('MoveTo');

	if (!Orion.FindObject('MoveFrom') ) {
		Orion.CharPrint('self', '906', 'select move from bag');
		Orion.AddObject('MoveFrom');
		WaitForPlayerToTarget(0);
	}
	if (!Orion.FindObject('MoveTo') ) {
		Orion.CharPrint('self', '906', 'select move to bag');
		Orion.AddObject('MoveTo');
		WaitForPlayerToTarget(0);
	}
	if ( 'MoveFrom' !== null && 'MoveTo' !== null ) {
		OrganizeFromList( 'MoveFrom', 'MoveTo', listname, amount);
	}
}


function WaitForPlayerToTarget(a) {
	while(Orion.HaveTarget()) {
		Orion.Wait(100);
	}
}
function WaitForTargetCursor(a) {
	while (!Orion.HaveTarget())	{
		Orion.Wait(100);
		break;
	}
}
