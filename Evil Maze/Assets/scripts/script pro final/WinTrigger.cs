using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WinTrigger : MonoBehaviour
{
    public GameObject winWindow;

    void OnTriggerEnter(Collider col)
    {
        winWindow.SetActive(true);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
