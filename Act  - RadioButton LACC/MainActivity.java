package com.example.radiobutton;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    private RadioGroup rgTipoPag;
    private Button btnconfir;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        rgTipoPag=findViewById(R.id.rgtipodepago);
        btnconfir=findViewById(R.id.btnconfirmar);

        btnconfir.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int id=rgTipoPag.getCheckedRadioButtonId();

                RadioButton rbid = findViewById(id);
                String tipopag = rbid.getText().toString();
                Toast.makeText(MainActivity.this, "Tipo de Pago:", Toast.LENGTH_SHORT).show();
            }
        });

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
}