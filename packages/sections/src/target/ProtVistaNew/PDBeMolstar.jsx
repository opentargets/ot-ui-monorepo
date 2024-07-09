
import { useEffect, useRef, useState } from 'react';
import { PDBeMolstarPlugin } from "pdbe-molstar/lib"

function PDBeMolstar({ uniprotId }) {

  const ref = useRef(null);

  useEffect(() => {

    console.log('EFFECT USED')
    
    // error if use inline styles - WHY?
    // since seems need to set bgrd after loading, hide the wrapper div to avoid
    // flash of black
    ref.current.style.visibility = 'hidden';
    ref.current.style.position = 'relative';
    ref.current.style.height = '400px';

    // create plugin instance
    const viewerInstance = new PDBeMolstarPlugin();
    window.instance = viewerInstance;

    // call render method to display 3D view
    viewerInstance.render(ref.current, {
      moleculeId: '1hda',
      hideControls: true,
    });

    // subscribe to events
    viewerInstance.events.loadComplete.subscribe(() => {
      console.log('Loaded');

      // need to call setBgColor after loading or nothing happens
      ref.current.style.visibility = 'visible';
      viewerInstance.canvas.setBgColor({ r: 255, g: 255, b: 255 });
    });

    // !!!!!!!!!!!!!!!!! HERE !!!!!!!!!!!!!
    // NOW: STYLE THE PLUGIN: REMOVE BORDER, DECIDE WHAT CONTROLS TO SHOW, ...
    // (SEE: https://embed.plnkr.co/plunk/OTCogg3q4CL5G82B)

  }, []);

  return <div id="pdbe-molstar-wrapper" ref={ref}></div>

}

export default PDBeMolstar;

// HERE
// - lazy load PDBeMolstar
//     - do noting in effect, then load once exists - so make PDBeMolstar a
        //  dependency of the effect
