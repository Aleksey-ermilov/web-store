import React, {useState,useEffect} from 'react';
import {connect} from "react-redux";
import  {Container, Button} from "react-bootstrap";

import Loading from "../components/Loading";

import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import CreateRole from "../components/modals/CreateRole";
import GiveRole from "../components/modals/GiveRole";
import KickUserRole from "../components/modals/KickUserRole";

import {getRoleUsers,addRoleUser,kickRoleUser,createRole} from "../http/adminAPI";
import {setUsersRoles,setUser,setRole} from "../store/admin/actionAdmin";

const Admin = ({setUsersRoles,setUser,setRole, roles,users}) => {
    const [isLoading, setIsLoading] = useState(true)

    const [ isBrandVisible, setIsBrandVisible ] = useState(false)
    const [ isTypeVisible, setIsTypeVisible ] = useState(false)
    const [ isDeviceVisible, setIsDeviceVisible ] = useState(false)
    const [ isRoleVisible, setIsRoleVisible ] = useState(false)
    const [ isGiveRoleVisible, setIsGiveRoleVisible ] = useState(false)
    const [ isKickUserRoleVisible, setIsKickUserRoleVisible ] = useState(false)

    useEffect(() => {
        getRoleUsers().then( data => setUsersRoles(data))
            .finally(() => setIsLoading(false))
    },[])

    const giveRole = (id,role) => {
        addRoleUser(id,role).then( data => setUser(data) )
    }

    const kickRole = (id,role) => {
        kickRoleUser(id,role).then( data => setUser(data) )
    }

    const addRole = value => {
        createRole(value).then( data => setRole(data) )
    }

    if (isLoading){
        return <Loading />
    }

    return (
        <Container className='d-flex flex-column'>
            <Button
                variant='outline-dark'
                className='mt-4 p-3'
                onClick={ () => setIsTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant='outline-dark'
                className='mt-4 p-3'
                onClick={ () => setIsBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant='outline-dark'
                className='mt-4 p-3'
                onClick={ () => setIsDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <Button
                variant='outline-dark'
                className='mt-4 p-3'
                onClick={ () => setIsRoleVisible(true)}
            >
                Создать роль
            </Button>
            <Button
                variant='outline-dark'
                className='mt-4 p-3'
                onClick={ () => setIsGiveRoleVisible(true)}
            >
                Присвоить права
            </Button>
            <Button
                variant='outline-dark'
                className='mt-4 p-3'
                onClick={ () => setIsKickUserRoleVisible(true)}
            >
                Забрать роль
            </Button>
            <CreateDevice show={isDeviceVisible} onHide={() => setIsDeviceVisible(false)}/>
            <CreateType show={isTypeVisible} onHide={() => setIsTypeVisible(false)}/>
            <CreateBrand show={isBrandVisible} onHide={() => setIsBrandVisible(false)}/>
            <CreateRole
                show={isRoleVisible}
                onHide={() => setIsRoleVisible(false)}
                addRole={addRole}
            />
            <KickUserRole
                show={isKickUserRoleVisible}
                onHide={() => setIsKickUserRoleVisible(false)}
                users={users}
                kickRole={kickRole}
            />
            <GiveRole
                show={isGiveRoleVisible}
                onHide={() => setIsGiveRoleVisible(false)}
                users={users}
                roles={roles}
                giveRole={giveRole}
            />
        </Container>
    );
};

const mapStateToProps = state => ({
    users: state.admin.users,
    roles: state.admin.roles,
})

const mapDispatchToProps = {
    setUsersRoles,setUser,setRole
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);