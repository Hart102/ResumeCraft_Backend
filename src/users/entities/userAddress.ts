import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
} from 'typeorm';
import { UserInfo } from './userInfo';

@Entity()
export class UserAddress {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    zipCode: string;

    @OneToOne(() => UserInfo, userInfo => userInfo.address, {onDelete: "CASCADE"})
    userInfo: UserInfo;
}