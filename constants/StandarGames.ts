export interface Game {
    name: string,
    time: number,
    image: any
}

export const games: Game[] = [
    {
        name: "Rapide",
        time: 10,
        image: require('../assets/images/Rapide.png')
    },
    {
        name: "Blitz",
        time: 3,
        image: require('../assets/images/Blitz.png')
    },
    {
        name: "Bullet",
        time: 1,
        image: require('../assets/images/Bullet.png')
    }
]  