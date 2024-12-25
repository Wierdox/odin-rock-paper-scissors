const input_field = document.getElementById("userInput");
const prompt_field = document.getElementById("promptOutput");
const container = document.getElementById("container");
input_field.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        // Prevent the default action (optional)
        event.preventDefault();

        let str = input_field.value;
        input_field.value = "";

        print(">" + str, true);
        main(str);
    }
});
{
    set_prompt("------------\nWant to play a game? 'Y'/'N'\n------------");
    input_field.focus();
}



let start_game = false;
let is_a_pussy_cat = false;

var player_score = 0;
var cpu_score    = 0;
var round_count  = 0;
var game_count   = 0;


let games_played = 0;

function main(input) {
    if (is_a_pussy_cat) return; 
    if (!start_game) {
        let start_response = input;
        if (start_response == "Y") {
            start_game = true;
            set_prompt("Game is now starting...");
        } else if (start_response == "N") {
            is_a_pussy_cat = true;
            set_prompt("Your loss...")
            return;
        } else {
            print("Invalid response.")
            return;
        }
    }

    let games_total = 5;
    if (games_played < games_total) {
        game_loop(input);
    } else if (games_played != 999) {
        games_played = 999;
        let score_average = player_score / games_total;
        let winner = "";
        if      (score_average > 0.5) winner = "You!";
        else if (score_average < 0.5) winner = "CPU!";
        else                          winner = "No one.";

        print(`------------\nTourney Results!!!\nWins: ${player_score}\nCPU Wins: ${cpu_score}\nYour Victory Average: ${score_average.toFixed(2)}\nOverall winner: ${winner}\nThat's all, good day.\n------------`);
    }
}

let waiting_for_input = false;

function game_loop(input = "") {
    let player_attack = 0;
    let cpu_attack    = 0;

    if (!waiting_for_input) {
        waiting_for_input = true;
        set_prompt(`------------\nGame ${game_count + 1}, Round ${round_count + 1}\n---- START ----`)
        print("---------")
        print("As you count down to the clash, you decide your weapon of choice.\nROCK, PAPER, or SCISSORS");
        return;
    }

    while (1) { // Attack Input, loop so we can do an early break; inside it.
        let move_response = input;

        // # style input
        if (typeof +move_response == "number" && +move_response >= 1 && +move_response <= 3) {
            player_attack = Math.round(+move_response) - 1;
            break;
        }
        //Remove digits, normalize
        move_response = move_response.replace(/\d+/g, '').toLowerCase()
        
        if (move_response.includes("rock") || move_response == "r") {
            player_attack = 0;
            break;
        } else if (move_response.includes("paper") || move_response == "p") {
            player_attack = 1;
            break;
        } else if (move_response.includes("scissors") || move_response == "s") {
            player_attack = 2;
            break;
        } else {
            print("Invalid response.");
            return;
        }
    }
    
    { //Enemy "AI"
        cpu_attack = Math.round(Math.random() * 2);
    }

    print(`CPU threw ${get_attack_name(cpu_attack)}.`);
    print(`You threw ${get_attack_name(player_attack)}.`);
    
    if (player_attack == cpu_attack) {
        print("The clash ends in a draw...");
        round_count++;
        return;
    }
    round_count = 0;
    game_count++;

    let player_win = false;
    switch (player_attack) {
        //Could be simplified by with
        //if (player_attack - 1 == cpu_attack) player_win = true;
        //assuming it wraped from 0 to 2.
        case 0:
            if (cpu_attack == 2) player_win = true;
            break;
        case 1:
            if (cpu_attack == 0) player_win = true;
            break;
        case 2:
            if (cpu_attack == 1) player_win = true;
            break;
    }
    if (player_win) {
        player_score++;
        print(`Your ${get_attack_name(player_attack)} beats the oponent's ${get_attack_name(cpu_attack)}.`);
    } else {
        cpu_score++;
        print(`The oponent's ${get_attack_name(cpu_attack)} beats your ${get_attack_name(player_attack)}.`);
    }

    games_played += 1;
    if (games_played == 5) {
        set_prompt(`------------\nGame ---- OVER ----`)
        main(input);
        return;
    }
    set_prompt(`------------\nGame ${game_count + 1}, Round ${round_count + 1}\n---- START ----`)
    print("---------")
    print("As you count down to the clash, you decide your weapon of choice.\nROCK, PAPER, or SCISSORS");
}

function get_attack_name(input) {
    switch (input) {
        case 0: return "Rock";
        case 1: return "Paper";
        case 2: return "Scissors";
        default:
            console.error("Invalid input for get_attack_name()");
    }
}

function print(message = "", is_player = false) {
    console.log(message);

    let new_text = document.createElement("div");
    new_text.innerText = message;
    if (is_player) {
        new_text.className = "player"
    }
    container.appendChild(new_text);

    prompt_field.scrollIntoView(true);
}

function set_prompt(message = "") {
    console.log(message);
    prompt_field.textContent = message;
}