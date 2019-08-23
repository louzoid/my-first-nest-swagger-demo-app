import { ApiModelProperty } from "@nestjs/swagger";

export class Cat {

    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    name: string;
}
