
import React from 'react';
import { SkillList } from './component';
import { useState } from 'react';

// const items = SkillList;


const SkillCard = (SkillList) => {
   return(
        <div>
            <img src={SkillList.image}/>
            <h1>{SkillList.name}</h1>
            <h2>{SkillList.rating}</h2>
            <h3>{SkillList.price}</h3>
            <h4>Buy</h4>

            {/* {items.map((item) => (
                <div key={item.id} style={{ marginBottom: "10px" }}>
                    <span>{item.name} - {item.price}Rs</span>
                    <button onClick={() => addToCart(item)} style={{ marginLeft: "10px" }}>
                             Add to Cart
                    </button>
                </div>
            ))} */}

       

            <button onClick={() => addToCart(item)} style={{ marginLeft: "10px" }}>
                Add to Cart
            </button>

        </div>
   );
};


const Body = () => {

    const [allSkills, setAllSkills] = useState([]);
    const [filterSkills, setFilterSkills] = useState(SkillList);

    function FilterSkills(searchText,allSkills){

      const filterData =filterSkills.filter(skill =>
        skill?.name?.toLowerCase()?.includes(searchText.toLowerCase())
      );
  
      return filterData;

    };
    
    const [searchText, setsearchText] = useState('Enter Input');

    return(
       <>   
            
            <input
                type="text"
                className="search-input"
                placeholder="Search Skills"
                value={searchText}
                onChange={(e) => {
                    setsearchText(e.target.value);
                }}
            />
             
            
            <button className="searchButton" onClick={()=>{

                const filterData=FilterSkills(searchText,allSkills);

                setFilterSkills(filterData);
            }}>Search</button>


            <div className="body">
             
                {filterSkills.map((Skill,index)=>{
                    return (
                        <> 
                            <SkillCard key={index} {...Skill}/>
                        </>
                       
                    );
                })}
           
           </div>

       </> 
   
    );  
};


export default Body;

