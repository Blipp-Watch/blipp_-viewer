"use client"
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BiMoney } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdMap } from "react-icons/md";
import { TbFriends } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

export default function BottomTabNavigator(){
    const [value, setValue] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (!router) {
            console.error("NextRouter was not mounted.");
        }
    }, [router]);

    const handleNavigation = (newValue: number) => {
        setValue(newValue);
        if (router) {
            switch (newValue) {
                case 0:
                    router.push('/');
                    break;
                case 1:
                    router.push('/Frens');
                    break;
                case 2:
                    router.push('/Quests');
                    break;
                case 3:
                    router.push('/Profile');
                    break;
                default:
                    break;
            }
        }
    };

    return(
    <Box sx={{ width: "100%", zIndex:50, bottom:0, backgroundColor:"black", opacity:"80%" ,display:"flex", position:"fixed", paddingTop:1, paddingBottom:1, borderTopLeftRadius:15, borderTopRightRadius:15 }} >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          handleNavigation(newValue);
        }}
        style={{ width: "100%", backgroundColor:"black", opacity:20, borderTopLeftRadius:15, borderTopRightRadius:15}}
      >
        <BottomNavigationAction label="Earn" icon={<FaHome color="white" size={40}/>} />
        <BottomNavigationAction label="Friends" icon={<FaPeopleGroup  color="white" size={40}/>} />
        <BottomNavigationAction label="Quests" icon={<MdMap  color="white" size={40}/>} />
        <BottomNavigationAction label="Profile" icon={<CgProfile  color="white" size={40}/>} />
      </BottomNavigation>
    </Box>
    )
}