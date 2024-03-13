import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@ApiTags('Artists')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({ summary: 'create artist' })
  @ApiResponse({ status: 201, type: Artist })
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @ApiOperation({ summary: 'get all artists' })
  @ApiResponse({ status: 200, type: [Artist] })
  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @ApiOperation({ summary: 'get artist by ID' })
  @ApiResponse({ status: 200, type: Artist })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  @ApiOperation({ summary: 'update artist info' })
  @ApiResponse({ status: 200, type: Artist })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @ApiOperation({ summary: 'delete artist with ID' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }
}
