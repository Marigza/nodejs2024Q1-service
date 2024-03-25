import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavsService } from './favs.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('favs')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @ApiOperation({ summary: 'get all favorites' })
  @ApiResponse({ status: 200 })
  @Get()
  async findAll() {
    return this.favsService.findAll();
  }
}

@ApiTags('favs/track')
@Controller('favs/track')
export class FavsTrackController {
  constructor(private readonly favsService: FavsService) {}

  @ApiOperation({ summary: 'add track to favorites' })
  @ApiResponse({ status: 201 })
  @Post(':id')
  async addTrackToFavs(@Param('id') id: string) {
    return this.favsService.addTrackToFavs(id);
  }

  @ApiOperation({ summary: 'delete track with ID from favorites' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.favsService.removeTrackFromFavs(id);
  }
}

@ApiTags('favs/album')
@Controller('favs/album')
export class FavsAlbumController {
  constructor(private readonly favsService: FavsService) {}

  @ApiOperation({ summary: 'add album to favorites' })
  @ApiResponse({ status: 201 })
  @Post(':id')
  async addAlbumToFavs(@Param('id') id: string) {
    return this.favsService.addAlbumToFavs(id);
  }

  @ApiOperation({ summary: 'delete album with ID from favorites' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.favsService.removeAlbumFromFavs(id);
  }
}

@ApiTags('favs/artist')
@Controller('favs/artist')
export class FavsArtistController {
  constructor(private readonly favsService: FavsService) {}

  @ApiOperation({ summary: 'add artist to favorites' })
  @ApiResponse({ status: 201 })
  @Post(':id')
  async addAlbumToFavs(@Param('id') id: string) {
    return this.favsService.addArtistToFavs(id);
  }

  @ApiOperation({ summary: 'delete artist with ID from favorites' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.favsService.removeArtistFromFavs(id);
  }
}
