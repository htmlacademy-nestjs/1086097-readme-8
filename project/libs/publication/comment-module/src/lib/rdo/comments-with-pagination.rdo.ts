import { Expose } from 'class-transformer';
import { CommentRdo } from './comment.rdo';
import { ApiProperty } from '@nestjs/swagger';

export class CommentWithPaginationRdo {
  @ApiProperty({
    description: 'Comment Entity',
  })
  @Expose()
  public entities?: CommentRdo[];

  @ApiProperty({
    description: 'Total Pages',
    example: '25',
  })
  @Expose()
  public totalPages?: number;

  @ApiProperty({
    description: 'Total Items',
    example: '4',
  })
  @Expose()
  public totalItems?: number;

  @ApiProperty({
    description: 'Current Page',
    example: '1',
  })
  @Expose()
  public currentPage?: number;

  @ApiProperty({
    description: 'Items Per Page',
    example: '10',
  })
  @Expose()
  public itemsPerPage?: number;
}
