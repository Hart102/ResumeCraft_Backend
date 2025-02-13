export class UserDto {
    userInfo: {
        firstName: string;
        lastName: string;
        dob: Date;
        occupation: string;
        gender: string;
        profilePhoto: string;
    };

    userContact: {
        email: string;
        phoneNumber: string;
        fax?: string;
        linkedInUrl?: string;
    };

    userAddress: {
        address: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
    };

    userAcademicBackground: {
        schoolName: string;
        degree: string;
        fieldOfStudy: string;
        startDate: Date;
        endDate: Date;
        grade: string;
        activities: string;
        description: string;
    };
}
