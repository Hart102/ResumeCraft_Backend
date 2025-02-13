import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { UserInfo } from "./userInfo"


@Entity("user_academic_background")
export class UserAcademicBackground {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    schoolName: string;

    @Column()
    degree: string;

    @Column()
    fieldOfStudy: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    grade: string;

    @Column()
    activities: string;

    @Column()
    description: string;

    @ManyToOne(() => UserInfo, userInfo => userInfo.academicBackgrounds, {
        onDelete: 'CASCADE',
    })
    userInfo: UserInfo;
}