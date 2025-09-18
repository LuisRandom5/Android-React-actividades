package com.example.recyclerview;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Toast;

import com.google.android.material.navigation.NavigationView;
//import com.prolificinteractive.materialcalendarview.MaterialCalendarView;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

    ImageGalleryAdapter adapter;
    RecyclerView recyclerView;
    clickListener listiner;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //Toolbar toolbar = (Toolbar)findViewById(R.id.toolbar);
        //toolbar.setTitle("");
        //setSupportActionBar(toolbar);

        List<examData> list = new ArrayList<>();
        list = getData();

        recyclerView = (RecyclerView)findViewById(R.id.recyclerView);
        listiner = new clickListener() {
            @Override
            public void click(int index){
                Toast.makeText(MainActivity.this,"clicked item index is "+index,Toast.LENGTH_LONG).show();
            }
        };
        adapter= new ImageGalleryAdapter(list, getApplication(),listiner);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(MainActivity.this));
    }

    @Override
    public void onBackPressed()
    {
        super.onBackPressed();
    }

    // Sample data for RecyclerView
    private List<examData> getData()
    {
        List<examData> list = new ArrayList<>();
        list.add(new examData("First Exam",
                "May 23, 2015",
                "Best Of Luck"));
        list.add(new examData("Second Exam",
                "June 09, 2015",
                "b of l"));
        list.add(new examData("My Test Exam",
                "April 27, 2017",
                "This is testing exam .."));

        list.add(new examData("My Test Exam",
                "April 27, 2017",
                "This is testing exam .."));
        list.add(new examData("My Test Exam",
                "April 27, 2017",
                "This is testing exam .."));
        list.add(new examData("My Test Exam",
                "April 27, 2017",
                "This is testing exam .."));
        list.add(new examData("My Test Exam",
                "April 27, 2017",
                "This is testing exam .."));
        list.add(new examData("My Test Exam",
                "April 27, 2017",
                "This is testing exam .."));
        list.add(new examData("My Test Exam",
                "April 27, 2017",
                "This is testing exam .."));
        list.add(new examData("My Test Exam",
                "April 27, 2017",
                "This is testing exam .."));
        list.add(new examData("My Test Exam",
                "April 27, 2017",
                "This is testing exam .."));
        list.add(new examData("My Test Exam",
                "April 27, 2017",
                "This is testing exam .."));
        list.add(new examData("My Test Exam",
                "April 27, 2017",
                "This is testing exam .."));
        list.add(new examData("My Test Exam",
                "April 27, 2017",
                "This is testing exam .."));
        return list;
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        return false;
    }
}