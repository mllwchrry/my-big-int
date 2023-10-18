class MyBigInt {
    constructor() {
        this.blocks = [];
    }

    setHex(hexString) {
        this.blocks = [];

        // Process the hexString in 8-character (32-bit) blocks
        for (let i = 0; i < hexString.length; i += 8) {
            const block = hexString.slice(i, i + 8);
            this.blocks.push(parseInt(block, 16));
        }

    }

    getHex() {
        // const bf = Buffer.from(this.blocks.map((b) => parseInt(b).toString(16).padStart(4, '0')).join(''), 'hex')
        return this.blocks.map(block => (block >>> 0).toString(16)
            .padStart(8, '0')).join('')
            .replace(/^0+/, '')
    }

    xor(other) {
        if (this.blocks.length !== other.blocks.length) {
            throw new Error('Numbers must be the same length for XOR operation');
        }

        const result = new MyBigInt();
        result.blocks = this.blocks.map((block, index) => block ^ other.blocks[index]);
        return result;
    }

    inv() {
        const result = new MyBigInt();
        result.blocks = this.blocks.map(block => ~block);
        return result;
    }

    or(other) {
        if (this.blocks.length !== other.blocks.length) {
            throw new Error('Numbers must be the same length for OR operation');
        }

        const result = new MyBigInt();
        result.blocks = this.blocks.map((block, index) => block | other.blocks[index]);
        return result;
    }

    and(other) {
        if (this.blocks.length !== other.blocks.length) {
            throw new Error('Numbers must be the same length for AND operation');
        }

        const result = new MyBigInt();
        result.blocks = this.blocks.map((block, index) => block & other.blocks[index]);
        return result;
    }

    // shiftR(bits) {
    //     if (bits < 0) {
    //         throw new Error('Shift value must be non-negative');
    //     } else if (bits > 32) {
    //         throw new Error('Make sure you shift by the value that is less or equal to 32 bits');
    //     } else {
    //         const result = new MyBigInt();
    //         result.setHex(Buffer.from(this.getHex(), 'hex').map(el => el >>> bits)?.toString('hex'))
    //         return result;
    //     }
    // }

    // shiftL(bits) {
    //     if (bits < 0) {
    //         throw new Error('Shift value must be non-negative');
    //     } else if (bits > 32) {
    //         throw new Error('Make sure you shift by the value that is less or equal to 32 bits');
    //     } else {
    //         this.setHex(Buffer.from(this.getHex(), 'hex').map(el => el << bits)?.toString('hex'))
    //
    //         return this;
    //     }
    // }

    add(other) {
        const result = new MyBigInt();
        let carry = 0;

        for (let i = this.blocks.length - 1, j = other.blocks.length - 1; i >= 0 || j >= 0 || carry; i--, j--) {
            const blockA = i >= 0 ? this.blocks[i] : 0;
            const blockB = j >= 0 ? other.blocks[j] : 0;

            const sum = blockA + blockB + carry;
            const blockResult = sum & 0xFFFFFFFF;
            result.blocks.unshift(blockResult);

            carry = sum > 0xFFFFFFFF ? 1 : 0;
        }

        return result;
    }

    sub(other) {
        const result = new MyBigInt();
        let borrow = 0;

        for (let i = this.blocks.length - 1, j = other.blocks.length - 1; i >= 0 || j >= 0; i--, j--) {
            const blockA = i >= 0 ? this.blocks[i] : 0;
            const blockB = j >= 0 ? other.blocks[j] : 0;

            let diff = blockA - blockB - borrow;
            if (diff < 0) {
                diff += 0x100000000;
                borrow = 1;
            } else {
                borrow = 0;
            }

            result.blocks.unshift(diff);
        }

        while (result.blocks.length > 1 && result.blocks[0] === 0) {
            result.blocks.shift();
        }

        return result;
    }

    mod() {
        const result = new MyBigInt();
        result.blocks = this.blocks.map(block => block >>> 0);
        return result;
    }

    mul(myBigInt) {
        const buffer1 = Buffer.from(this.getHex(), 'hex');
        const buffer2 = Buffer.from(myBigInt.getHex(), 'hex');
        const len1 = buffer1.length;
        const len2 = buffer2.length;
        const resultBuffer = Buffer.alloc(len1 + len2).fill(0);

        for (let i = len1 - 1; i >= 0; i--) {
            let carry = 0;
            for (let j = len2 - 1; j >= 0; j--) {
                const product = buffer1[i] * buffer2[j] + resultBuffer[i + j + 1] + carry;
                resultBuffer[i + j + 1] = product & 0xFF;
                carry = product >>> 8;
            }
            resultBuffer[i] += carry;
        }

        const resultHex = resultBuffer.toString('hex').replace(/^0+/, '');

        const result = new MyBigInt();
        result.setHex(resultHex || '0');
        return result;
    }
}

module.exports = MyBigInt;