export class CreateUserRequest {
    // User Info
    name: string;
    age: number;
    firstName: string;
    lastName: string;
    dob: Date;
    occupation: string;
    gender: string;
   
    // User Contact
    email: string;
    phoneNumber: string;    
    fax?: string;    
    linkedInUrl?: string;

    // User Address
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;

    // Academic background
    schoolName: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date;
    grade: string;
    activities: string;
    description: string;
}