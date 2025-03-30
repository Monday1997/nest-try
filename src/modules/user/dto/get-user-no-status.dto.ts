import { Exclude } from 'class-transformer';

/* class Role$1 {
  id: number;
  name: string;
  movieId: number;
  movieName: string;
}

export class GetUserNoStatusDto {
  id: number;
  username: string;
  password: string;
  name: string;
  phone: string;
  createdAt: Date;
  updateAt: Date;
  status: string;
  substituteId: number;
  phones: bigint;
  @Type(() => Role$1)
  role: Array<Role$1>;
} */
export class GetUserNoStatusDto {
  @Exclude()
  status: string;
  @Exclude()
  name: string;
}
