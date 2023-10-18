const chai= require('chai');
const MyBigInt = require('./index');

const expect = chai.expect;

const val1 = '51bf608414ad5726a3c1bec098f77b1b54ffb2787f8d528a74c1d7fde6470ea4';
const val2 = '403db8ad88a3932a0b7e8189aed9eeffb8121dfac05c3512fdb396dd73f6331c';
const val3 = '36f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5ab80';
const val4 = '70983d692f648185febe6d6fa607630ae68649f7e6fc45b94680096c06e4fadb';
const val5 = '33ced2c76b26cae94e162c4c0d2c0ff7c13094b0185a3c122e732d5ba77efebc';
const val6 = '22e962951cb6cd2ce279ab0e2095825c141d48ef3ca9dabf253e38760b57fe03';
const val7 = '7d7deab2affa38154326e96d350deee1';
const val8 = '97f92a75b3faf8939e8e98b96476fd22';

describe('MyBigInt', () => {
    let myBigIntA;
    let myBigIntB;

    beforeEach(() => {
        myBigIntA = new MyBigInt();
        myBigIntB = new MyBigInt();
    });

    describe('setHex', () => {
        it('should set the value from a hexadecimal string', () => {
            myBigIntA.setHex(val1);
            expect(myBigIntA.getHex()).to.equal(val1);
        });
    });

    describe('xor', () => {
        it('should perform a bitwise XOR operation', () => {
            myBigIntA.setHex(val1);
            myBigIntB.setHex(val2);
            const result = myBigIntA.xor(myBigIntB);

            const expectedResult = (BigInt('0x' + val1) ^ BigInt('0x' + val2)).toString(16);

            expect(result.getHex()).to.equal(expectedResult);
        });
    });

    describe('inv', () => {
        it('should perform a bitwise NOT operation', () => {
            myBigIntA.setHex(val1);
            const result = myBigIntA.inv();
            const hexBuffer = Buffer.from(val1, 'hex')

            for (let i = 0; i < hexBuffer.length; i++) {
                hexBuffer[i] = ~hexBuffer[i];
            }
            const invertedHex = hexBuffer.toString('hex')

            expect(result.getHex()).to.equal(invertedHex);
        });
    });

    describe('or', () => {
        it('should perform a bitwise OR operation', () => {
            myBigIntA.setHex(val1);
            myBigIntB.setHex(val2);
            const result = myBigIntA.or(myBigIntB);

            const expectedResult = (BigInt('0x' + val1) | BigInt('0x' + val2)).toString(16);

            expect(result.getHex()).to.equal(expectedResult);
        });
    });

    describe('and', () => {
        it('should perform a bitwise AND operation', () => {
            myBigIntA.setHex(val1);
            myBigIntB.setHex(val2);
            const result = myBigIntA.and(myBigIntB);

            const expectedResult = (BigInt('0x' + val1) & BigInt('0x' + val2)).toString(16);

            expect(result.getHex()).to.equal(expectedResult);
        });
    });

    // describe('shiftR', () => {
    //     it('should shift the bits to the right', () => {
    //         myBigIntA.setHex(val1);
    //         const result = myBigIntA.shiftR(2);
    //
    //         const expectedResult = (BigInt('0x' + val1) >> 2n).toString(16);
    //
    //         expect(result.getHex()).to.equal(expectedResult);
    //     });
    // });

    // describe('shiftL', () => {
    //     it('should shift the bits to the left', () => {
    //         myBigIntA.setHex(val1);
    //         const result = myBigIntA.shiftL(2);
    //
    //         const expectedResult = (BigInt('0x' + val1) << 2n).toString(16);
    //
    //         expect(result.getHex()).to.equal(expectedResult);
    //     });
    // });

    describe('add', () => {
        it('should perform addition of two BigInts', () => {
            myBigIntA.setHex(val3);
            myBigIntB.setHex(val4);
            const result = myBigIntA.add(myBigIntB);

            const expectedResult = (BigInt('0x' + val3) + BigInt('0x' + val4)).toString(16);

            expect(result.getHex()).to.equal(expectedResult);
        });
    });

    describe('sub', () => {
        it('should perform subtract two BigInts', () => {
            myBigIntA.setHex(val5);
            myBigIntB.setHex(val6);
            const result = myBigIntA.sub(myBigIntB);

            const expectedResult = (BigInt('0x' + val5) - BigInt('0x' + val6)).toString(16);

            expect(result.getHex()).to.equal(expectedResult);
        });
    });

    describe('mod', () => {
        it('should perform a modulo operation on the BigInt', () => {
            myBigIntA.setHex(val3);
            const result = myBigIntA.mod();

            const number = BigInt('0x' + val3);
            const expectedResult = number < 0 ? -number : number;
            expect(result.getHex()).to.equal(expectedResult.toString(16));
        });
    });

    describe('mul', () => {
        it('should perform multiplication of two BigInts', () => {
            myBigIntA.setHex(val7);
            myBigIntB.setHex(val8);
            const result = myBigIntA.mul(myBigIntB);

            const expectedResult = (BigInt('0x' + val7) * BigInt('0x' + val8)).toString(16);

            expect(result.getHex()).to.equal(expectedResult);
        });
    });

});