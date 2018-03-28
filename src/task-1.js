const NORTH = "north",
    EAST = "east",
    SOUTH = "south",
    WEST = "west";

class Rover {
    constructor(x = 0, y = 0, direction = NORTH) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.degree = this._parseDegree();
        const directions = [NORTH, EAST, SOUTH, WEST];
        if (!directions.includes(direction)) {
            throw new TypeError(`Incorrect args ${direction}`);
        }
        if (parseInt(this.x, 10) !== this.x || parseInt(this.y, 10) !== this.y) {
            throw new TypeError(`Incorrect args ${x} ${y}`);
        }
    }

    _parseDegree() {
        switch (this.direction) {
            case "north":
                return 90;
            case "east":
                return 0;
            case "west":
                return 180;
            case "south":
                return 270;
            default:
                return "Incorrect direction";
        }
    }

    _parseDirection() {
        switch (this.degree) {
            case 90:
            case -270:
                return "north";
            case 0:
                return "east";
            case 180:
            case -180:
                return "west";
            case 270:
            case -90:
                return "south";
            default:
                return `Incorrect direction: ${this.degree}`;
        }
    }

    left() {
        if (this.degree === 360) {
            this.degree = 0;
        }
        this.degree += 90;
        this.direction = this._parseDirection();
        return this;
    }

    right() {
        if (this.degree === -360) {
            this.degree = 90;
        }
        this.degree -= 90;
        this.direction = this._parseDirection();
        return this;
    }

    move(n) {
        if (parseInt(n, 10) !== n) {
            throw new TypeError(`Not relevant ${n}"`);
        }

        function getRadians(deg) {
            return deg * Math.PI / 180;
        }

        this.x += Math.cos(getRadians(this.degree)).toFixed() * n;
        this.y += Math.sin(getRadians(this.degree)).toFixed() * n;

        return this;
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    getDirection() {
        return this.direction;
    }
}

export { NORTH, EAST, SOUTH, WEST, Rover };
