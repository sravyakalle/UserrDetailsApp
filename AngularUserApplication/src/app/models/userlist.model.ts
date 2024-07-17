
// type GUID = string & { isGuid: true};
// function guid(guid: string) : GUID {
//     return  guid as GUID; 
// }

export interface UserList {
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    status: string,
    department: string
}

