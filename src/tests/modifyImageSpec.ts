import { modifyImage } from '../controller/imageController.js';
import type { Request, Response } from 'express';
import fs from 'fs';

type FakeResponse = Response & {
  statusCode: number;
  sent?: unknown;
  fileSent?: string;
};

const fakeRes = (): FakeResponse => {
  const res: FakeResponse = {
    statusCode: 200,
    sent: undefined,
    fileSent: undefined,

    status(code: number) {
      res.statusCode = code;
      return res;
    },
    send(msg: unknown) {
      res.sent = msg;
      return res;
    },
    sendFile(filePath: string) {
      res.fileSent = filePath;
      return res;
    }
  } as unknown as FakeResponse;

  return res;
};

describe('modifyImage - unit tests ', () => {
  it('works with valid input (width/height OK)', async () => {
    const req: Request = {
      query: { filename: 'icelandwaterfall', width: '200', height: '200' }
    } as unknown as Request;

    spyOn(fs, 'existsSync').and.returnValue(true);

    const res = fakeRes();

    await modifyImage(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.fileSent).toBeDefined();
  });

  it('correctly handles invalid input (incorrect width/height)', async () => {
    const req: Request = {
      query: { filename: 'icelandwaterfall', width: 'abc', height: '200' }
    } as unknown as Request;

    const res = fakeRes();

    await modifyImage(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.sent).toBe('Invalid width or height');
  });
});
