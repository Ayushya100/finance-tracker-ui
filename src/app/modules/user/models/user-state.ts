class UserPermissions {
    viewPermission: boolean = false;
    editPermission: boolean = false;
    deletePermission: boolean = false;
    routeViewPermission: boolean = false;
    routeEditPermission: boolean = false;
    routeDeletePermission: boolean = false;
    roleViewPermission: boolean = false;
    roleEditPermission: boolean = false;
    roleDeletePermission: boolean = false;
    scopeViewPermission: boolean = false;
    scopeEditPermission: boolean = false;
    scopeDeletePermission: boolean = false;
}

class UserSetup {
    categoryName: string = '';
    categoryDescription: string = '';
    value: string = '';
}

export class UserState {
    _id: string = '';
    firstName: string = '';
    lastName: string = '';
    userName: string = '';
    emailId: string = '';
    bio: string = '';
    gender: string = '';
    dob: any = null;
    contactNumber: string = '';
    profileImageURL: string = '';
    lastLogin: any = null;
    loginCount: number = 0;
    isVerified: boolean = false;
    isDeleted: boolean = false;
    userRole: string = '';
    userScopes: Array<string> = new Array<string>;
    userSetup: Array<UserSetup> = new Array<UserSetup>;
    userPermissions: UserPermissions = new UserPermissions;
}
