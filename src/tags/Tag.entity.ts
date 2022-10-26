import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: 'tags'})
export class TagEnity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string


}