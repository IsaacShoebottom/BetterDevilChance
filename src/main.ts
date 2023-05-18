import {HealthType, ModCallbackCustom, upgradeMod} from "isaacscript-common";
import {LevelStateFlag} from "isaac-typescript-definitions";

const MOD_NAME = "BetterDevilChance";

main();

function main() {
	const modVanilla = RegisterMod(MOD_NAME, 1);
	const mod = upgradeMod(modVanilla);

	mod.AddCallbackCustom(ModCallbackCustom.POST_PLAYER_CHANGE_HEALTH,
		(player, healthType) => {
			Isaac.DebugString("Callback fired: POST_PLAYER_CHANGE_HEALTH");

			if (healthType !== HealthType.RED) {	// Only care about red hearts
				return
			}
			if (!player.HasFullHearts()) {			// Only care about full hearts
				return
			}

			Game().GetLevel().SetStateFlag(LevelStateFlag.RED_HEART_DAMAGED, false)
			Isaac.DebugString(`${MOD_NAME}: Regained full red hearts. Devil chance restored.`)
		})

	// Print a message to the "log.txt" file.
	Isaac.DebugString(`${MOD_NAME} initialized.`);
}