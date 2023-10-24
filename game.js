{//main
    let start_game = false;
    print("------------\nWant to play a game? Y/N\n------------");

    while (1) {//input loop
        let start_response = prompt("Accept the consequences?");
        if (start_response == "Y") {
            start_game = true;
            print("Game is now starting...");
            break;
        } else if (start_response == "N") {
            print("Your loss...")
            break;
        }
        print("Invalid response.")
    }

    if (start_game) {
        var player_score = 0;
        var cpu_score    = 0;
        var round_count  = 0;
        var game_count   = 0;

        let games_played = 5;
        for (let i = 0; i < games_played; i++) {
            game_loop()
        }
        let score_average = player_score / games_played;
        let winner = "";
        if      (score_average > 0.5) winner = "You!";
        else if (score_average < 0.5) winner = "CPU!";
        else                          winner = "No one.";

        print(`------------\nTourney Results!!!\nWins: ${player_score}\nCPU Wins: ${cpu_score}\nVictory Average: ${score_average.toFixed(2)}\nOverall winner: ${winner}\nThat's all, good day.\n------------`);
    }
}

function game_loop() {
    let player_attack = 0;
    let cpu_attack    = 0;

    print(`------------\nGame ${game_count + 1}, Round ${round_count + 1}\n---- START ----`)

    while (1) {//input loop
        let move_response = prompt("As you count down to the clash, you decide your weapon of choice.\nROCK, PAPER, or SCISSORS");
        //alt input
        if (typeof +move_response == "number" && +move_response >= 1 && +move_response <= 3) {
            player_attack = Math.round(+move_response) - 1;
            break;
        }
        //Remove digits, normalize
        move_response = move_response.replace(/\d+/g, '').toLowerCase()
        
        if (move_response.includes("rock")) {
            player_attack = 0;
            break;
        } else if (move_response.includes("paper")) {
            player_attack = 1;
            break;
        } else if (move_response.includes("scissors")) {
            player_attack = 2;
            break;
        }
        print("Invalid response.");
    }

    {//Enemy "AI"
        cpu_attack = Math.round(Math.random() * 2);
    }

    print(`CPU threw ${get_attack_name(cpu_attack)}.`);
    print(`You threw ${get_attack_name(player_attack)}.`);
    
    if (player_attack == cpu_attack) {
        print("The clash ends in a draw...");
        round_count++;
        game_loop();
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

function print(message = "") {
    console.log(message);
    //For some reason this won't be visible until the script ends???
    let new_text = document.createElement("div");
    new_text.innerText = message;
    document.body.append(new_text);
}