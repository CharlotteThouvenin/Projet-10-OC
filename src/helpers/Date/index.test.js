
import { getMonth } from ".";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            const date=new Date("2022-01-01")
            const expectedMonth="janvier"
            expect(getMonth(date)).toBe(expectedMonth);
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            const date=new Date("2022-07-08")
            const expectedMonth="juillet"
            expect(getMonth(date)).toBe(expectedMonth);
        });
    });
})

