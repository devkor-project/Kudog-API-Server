import { MockContext, Context, createMockContext } from "../config/jestContext";
import request from "supertest";

// set Mock
let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

// 테스트 임시 삭제
