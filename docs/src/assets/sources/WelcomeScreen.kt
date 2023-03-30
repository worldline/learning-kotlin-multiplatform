@Composable()
internal fun welcomeScreen(){

    Box(
        contentAlignment = Alignment.Center,
        modifier = Modifier.fillMaxWidth().fillMaxHeight()
    ) {
        Card(
            shape = RoundedCornerShape(8.dp),
            modifier = Modifier.padding(10.dp),
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                if(getPlatform().name != "ios")


                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        text = "Quizz",
                        fontSize = 30.sp,
                        modifier = Modifier.padding(all = 10.dp)
                    )
                    Text(
                        modifier = Modifier.padding(all = 10.dp),
                        text = "A simple Quizz to discovers KMP, KMM and compose.",
                    )
                    Button(
                        modifier = Modifier.padding(all = 10.dp),
                        onClick = {  }

                    ) {
                        Text("Start the Quizz")
                    }
                }
            }
        }
    }
}