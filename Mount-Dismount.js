////////////////////////////////////////////////////////////////////////////////
//                            ~ Mount / Dismount~                             //
//                             - Taldor / Quin -                              //
////////////////////////////////////////////////////////////////////////////////
//
// Ulozeni aktualniho mounta a nasledne mount/dismount pres jeden hotkey.
//
// Pouziti:
// Hotkey -> Run script :
// AddMount() => prida mounta do object listu
// MountAndDismount() => nasedne/ sleze z mounta, nutne prvne ulozit mounta pres AddMount
//
////////////////////////////////////////////////////////////////////////////////

function AddMount() {
  Orion.AddObject('myMount');
  Orion.Print('-1', 'Target your mount')
}

function MountAndDismount() {
  if (!Orion.ObjAtLayer('Mount')) {
    if (!Orion.FindObject('myMount'))
      AddMount();
    else
      Orion.UseObject('myMount');
  } else
    Orion.UseObject('self');
}
