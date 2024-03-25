import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({ summary: 'create album' })
  @ApiResponse({ status: 201, type: Album })
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @ApiOperation({ summary: 'get all albums' })
  @ApiResponse({ status: 200, type: [Album] })
  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @ApiOperation({ summary: 'get album with ID' })
  @ApiResponse({ status: 200, type: Album })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.albumService.findOne(id);
  }

  @ApiOperation({ summary: 'update album' })
  @ApiResponse({ status: 200, type: Album })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @ApiOperation({ summary: 'delete user with ID' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.albumService.remove(id);
  }
}
