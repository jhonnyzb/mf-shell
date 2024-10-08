import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { ListBoardsResponseModel } from 'src/app/core/models/response/listBoardsResponse.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { BoardService } from './board.service';
import { ListBoardsRequestModel } from 'src/app/core/models/request/listBoardRequest.model';

describe('BoardService', () => {
    let service: BoardService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BoardService]
        });

        service = TestBed.inject(BoardService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should fetch boards list correctly', () => {
        const mockRequest: ListBoardsRequestModel = {
            boardTypeId: 1,
            programId: 6
        };

        const mockResponse: ResponseBaseModel<ListBoardsResponseModel> = {
            codeId: 200,
            message: 'Success',
            data: {
                boardEntities: [
                    {
                        boardId: 1,
                        boardTypeId: 101,
                        languageId: 1,
                        programId: 1001,
                        name: 'Board 1',
                        startDateValidity: '2024-01-01',
                        endDateValidity: '2024-12-31',
                        openingModeId: 2,
                        url: 'https://example.com/board1',
                        image: 'https://example.com/images/board1.jpg',
                        displayOrder: 1,
                        properties: '',
                        dateRegister: '2024-01-01T12:00:00Z',
                        dateUpdate: '2024-01-02T12:00:00Z',
                        personIdCreate: 1001,
                        personIdUpdate: 1002,
                        segments: [
                            {
                                clusterId: 1,
                                name: 'Segmento 1'
                            },
                            {
                                clusterId: 2,
                                name: 'Segmento 2'
                            }
                        ]
                    },
                    {
                        boardId: 2,
                        boardTypeId: 102,
                        languageId: 1,
                        programId: 1002,
                        name: 'Board 2',
                        startDateValidity: '2024-02-01',
                        endDateValidity: '2024-11-30',
                        openingModeId: 3,
                        url: 'https://example.com/board2',
                        image: 'https://example.com/images/board2.jpg',
                        displayOrder: 2,
                        properties: '',
                        dateRegister: '2024-02-01T14:00:00Z',
                        dateUpdate: '2024-02-02T14:00:00Z',
                        personIdCreate: 1003,
                        personIdUpdate: 1004,
                        segments: [
                            {
                                clusterId: 3,
                                name: 'Segmento 3'
                            },
                            {
                                clusterId: 4,
                                name: 'Segmento 4'
                            }
                        ]
                    }
                ]
            }
        };

        service.listBoards(mockRequest).subscribe(response => {
            expect(response.codeId).toEqual(mockResponse.codeId);
            expect(response.message).toEqual(mockResponse.message);
            expect(response.data).toEqual(mockResponse.data);
            expect(response.data.boardEntities[0].name).toEqual('Board 1');
            expect(response.data.boardEntities[0].url).toEqual('https://example.com/board1');

        });

        const req = httpMock.expectOne(`${environment.apiValepro}/board-api/api/v1/board/by-type-and-program`);
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
    });
});
