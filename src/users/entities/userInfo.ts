import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserContact } from './userContact';
import { UserAddress } from './userAddress';
import { UserAcademicBackground } from './userAcademicBackground';

@Entity({name: "user_info"})
export class UserInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    dob: Date;

    @Column()
    occupation: string;

    @Column()
    gender: string;

    @Column()
    profilePhoto: string;

    // @Column()
    // filename: string;

    @Exclude()
    @Column({ type: "bytea" })
    data: Buffer;

    @Column()
    mimetype: string;

    @OneToOne(() => UserContact, userContact => userContact.userInfo, { cascade: true })
    @JoinColumn({ name: 'contactId' })
    contact: UserContact;

    @OneToOne(() => UserAddress, userAddress => userAddress.userInfo, { cascade: true })
    @JoinColumn({ name: 'addressId' })
    address: UserAddress;

    @OneToMany(() => UserAcademicBackground, (background) => background.userInfo, { cascade: true })
    academicBackgrounds: UserAcademicBackground[];
}
