import { Role } from "../../common/enums/role.enum";
import { 
    Column, 
    DeleteDateColumn, 
    Entity, 
    PrimaryColumn 
} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;
    
    @Column({ unique: true, nullable: false })
    email: string;

    @Column()
    name: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @DeleteDateColumn()
    deletedAt: Date;
}
