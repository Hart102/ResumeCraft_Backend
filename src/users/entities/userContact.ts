import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
} from 'typeorm';
import { UserInfo } from './userInfo';

@Entity()
export class UserContact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    fax?: string;

    @Column({ nullable: true })
    linkedInUrl?: string;

    @OneToOne(() => UserInfo, userInfo => userInfo.contact, { onDelete: "CASCADE"})
    userInfo: UserInfo;
}