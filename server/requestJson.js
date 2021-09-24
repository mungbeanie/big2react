// on join/update game - in lobby
// {
// 	"type": "update",
// 	"payload": {
// 		"gameState": {
// 			"clientIds": [
// 				"lSKSxOGYPZ"
// 			],
// 			"players": {
// 				"lSKSxOGYPZ": {
// 					"username": "poop",
// 					"cards": [],
// 					"pass": false,
// 					"connected": true
// 				}
// 			},
// 			"startGame": false,
// 			"currentPlayer": "",
// 			"lastPlayed": {
// 				"player": "",
// 				"cards": []
// 			},
// 		},
// 	}
// }

// in-game
let ingame = {
  type: "update",
  payload: {
    gameState: {
      clientIds: ["lSKSxOGYPZ", "VVfcPsknQ", "CTO2joQyF"],
      players: {
        lSKSxOGYPZ: {
          username: "poop",
          cards: [
            "10h",
            "Ad",
            "7h",
            "4c",
            "10s",
            "2c",
            "2h",
            "3c",
            "6h",
            "Jc",
            "3h",
            "Jh",
            "6s",
            "5d",
            "Qs",
            "As",
            "Js",
          ],
          pass: false,
          connected: true,
        },
        VVfcPsknQ: {
          name: "MemVfP7Mpo",
          cards: [
            "4h",
            "6c",
            "4s",
            "Kc",
            "Qd",
            "10d",
            "2d",
            "9d",
            "8d",
            "5s",
            "5c",
            "Ac",
            "Kd",
            "8h",
            "9s",
            "Qh",
            "Qc",
          ],
          pass: false,
          connected: true,
        },
        CTO2joQyF: {
          username: "loneg",
          cards: [
            "2s",
            "8c",
            "5h",
            "8s",
            "7d",
            "10c",
            "9c",
            "6d",
            "Jd",
            "7c",
            "Ks",
            "3d",
            "9h",
            "3s",
            "Ah",
            "7s",
            "Kh",
            "4d",
          ],
          pass: false,
          connected: true,
        },
      },
      startGame: true,
      currentPlayer: "CTO2joQyF",
      lastPlayed: {
        player: "CTO2joQyF",
        cards: [],
      },
      playHistory: [],
    },
  },
};
