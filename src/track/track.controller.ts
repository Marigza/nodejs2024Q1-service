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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({ summary: 'create track' })
  @ApiResponse({ status: 201, type: Track })
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @ApiOperation({ summary: 'get all tracks' })
  @ApiResponse({ status: 200, type: [Track] })
  @Get()
  async findAll() {
    return this.trackService.findAll();
  }

  @ApiOperation({ summary: 'get track with ID' })
  @ApiResponse({ status: 200, type: Track })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @ApiOperation({ summary: 'update track' })
  @ApiResponse({ status: 200, type: Track })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @ApiOperation({ summary: 'delete track with ID' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.trackService.remove(id);
  }
}
