package com.example.splashscreen;

import android.os.Bundle;
import android.view.animation.AnimationUtils;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
}
goku1= AnimationUtils.loadAnimation(this, R.anim.goku1_anim);
goku2= AnimationUtils.loadAnimation(this, R.anim.goku2_anim);
imgGoku1.startAnimation(goku1);
imGoku2.startAnimation(goku2);

Handler handler = new Handler();
handler.postDelayed(new Runnable() {
    @Override
    public void run() {
        startActivity(new Intent(MainActivity.this, MainActivity2.class));
    }
}, 1500);
}