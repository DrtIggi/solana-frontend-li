export const idl = {
  "version": "0.1.0",
  "name": "dice_roll",
  "instructions": [
    {
      "name": "setup",
      "accounts": [
        {
          "name": "diceRoll",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vendor",
          "type": "publicKey"
        },
        {
          "name": "betAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "play",
      "accounts": [
        {
          "name": "diceRoll",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vendor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "rollNumber",
          "type": "i64"
        }
      ]
    },
    {
      "name": "delete",
      "accounts": [
        {
          "name": "diceRoll",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vendor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "player",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "DiceRoll",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "players",
            "type": {
              "array": [
                "publicKey",
                2
              ]
            }
          },
          {
            "name": "vendorSeed",
            "type": "i64"
          },
          {
            "name": "state",
            "type": {
              "defined": "DiceRollState"
            }
          },
          {
            "name": "betAmount",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "DiceRollState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Active"
          },
          {
            "name": "Finished",
            "fields": [
              {
                "name": "winner",
                "type": "publicKey"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Side",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "One"
          },
          {
            "name": "Two"
          },
          {
            "name": "Three"
          },
          {
            "name": "Four"
          },
          {
            "name": "Five"
          },
          {
            "name": "Six"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "BetTooSmall",
      "msg": "Bet amount is too small"
    }
  ]
}