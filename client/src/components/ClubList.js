import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


function ClubList(props) {  

  return (
    <div className="ClubSearch">
      
            {
                props.clubs.map(p => (
                    <div key={p.id}>
                        <p>{p.name}</p>
                        <p>{p.category}</p>
                    </div>
                ))
            }
     </div>

  );
}

export default ClubList;
