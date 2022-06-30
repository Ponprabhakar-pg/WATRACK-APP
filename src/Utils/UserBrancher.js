import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function UserBrancher (){
    let navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('watrack') !== null || undefined){
            let userData = JSON.parse(localStorage.watrack);
            if(userData['user_type'] === "user"){
                navigate('/user');
            }
            else if(userData['user_type'] === "admin"){
                navigate('/admin');
            }
            else if(userData['user_type'] === "super admin"){
                navigate('/superadmin');
            }
        }
    });
    
}